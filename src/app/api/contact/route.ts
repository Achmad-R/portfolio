import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
});

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

  const ip = getClientIp(request);
  const throttleUntil = new Date(Date.now() - THROTTLE_MS);

  const recent = await prisma.message.count({
    where: { ip, createdAt: { gte: throttleUntil } },
  });

  if (recent > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  await prisma.message.create({
    data: { ...parsed.data, ip },
  });

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: `${site.name} Contact <onboarding@resend.dev>`,
        to: process.env.CONTACT_NOTIFY_EMAIL ?? site.email,
        replyTo: parsed.data.email,
        subject: `[Portfolio] ${parsed.data.subject}`,
        text: `New contact message from ${parsed.data.name} <${parsed.data.email}>\n\nSubject: ${parsed.data.subject}\n\n${parsed.data.message}`,
      });
    } catch {
      // Pesan tetap tersimpan di DB walau email gagal — jangan bocorkan detail.
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
