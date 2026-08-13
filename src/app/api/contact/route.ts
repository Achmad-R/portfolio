import { after, NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";
import { contactSchema } from "@/lib/contact-schema";

const THROTTLE_MS = 5 * 60 * 1000;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  // Honeypot terisi → bot. Balas sukses tanpa menyimpan apa pun.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const ip = getClientIp(request);
  const throttleUntil = new Date(Date.now() - THROTTLE_MS);

  const recent = await prisma.message.count({
    where: { ip, createdAt: { gte: throttleUntil } },
  });

  if (recent > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  await prisma.message.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
      ip,
    },
  });

  // Kirim email setelah response terkirim — tidak pernah memblokir client.
  if (process.env.RESEND_API_KEY) {
    const { name, email, subject, message } = parsed.data;
    after(() => {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY!);
        resend.emails.send({
          from: `${site.name} Contact <onboarding@resend.dev>`,
          to: process.env.CONTACT_NOTIFY_EMAIL ?? site.email,
          replyTo: email,
          subject: `[Portfolio] ${subject}`,
          text: `New contact message from ${name} <${email}>\n\nSubject: ${subject}\n\n${message}`,
        });
      } catch {
        // Pesan tetap tersimpan di DB walau email gagal — jangan bocorkan detail.
      }
    });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
