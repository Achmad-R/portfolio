import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { site } from "../src/lib/site";
import { prisma } from "../src/lib/prisma";

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? site.email;
  let adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    adminPassword = randomBytes(18).toString("base64url");
    console.log(`ADMIN_PASSWORD tidak di-set — password baru di-generate: ${adminPassword}`);
    console.log("Simpan password ini; tidak akan ditampilkan lagi.");
  }

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: { email: adminEmail, passwordHash },
    });
    console.log(`Admin user seeded: ${adminEmail}`);
  } else {
    console.log(`Admin user sudah ada, dilewati: ${adminEmail}`);
  }

  const hasContent =
    (await prisma.project.count()) > 0 || (await prisma.blogPost.count()) > 0;
  if (hasContent) {
    console.log("Konten placeholder dilewati (sudah ada konten).");
  } else {
    await prisma.project.createMany({
      data: [
        {
          title: "Terminal Portfolio CMS",
          slug: "terminal-portfolio-cms",
          shortDescription:
            "A self-hosted portfolio with a built-in CMS. This very site — markdown blogging, project showcase, and a custom admin panel.",
          content: `## Overview

A fullstack portfolio + CMS running on **Next.js 16** with a Supabase Postgres database. It includes a custom admin panel for managing projects, blog posts, and contact messages — all in one codebase.

## Highlights

- ISR with on-demand revalidation — edits appear instantly on the public site
- Markdown-based blogging with tags, pagination, and RSS
- Contact form with honeypot and rate limiting, notified via email
- Dark, terminal-inspired design

## Stack

- **Frontend**: Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- **Backend**: Prisma ORM + Supabase Postgres
- **Storage**: Supabase Storage
- **Auth**: Auth.js (credentials, single admin)`,
          liveUrl: "",
          repoUrl: "https://github.com/Achmad-R",
          coverImageUrl: "",
          techStack: ["Next.js", "TypeScript", "Supabase", "Prisma", "Tailwind"],
          featured: true,
          published: true,
        },
        {
          title: "Realtime Chat App",
          slug: "realtime-chat-app",
          shortDescription:
            "A realtime messaging application with rooms, presence indicators, and message history, built on a WebSocket backend.",
          content: `## Overview

A realtime chat application where users can create rooms, see who's online, and exchange messages instantly.

## Features

- Realtime messaging via WebSockets
- Presence indicators (online/offline per room)
- Persisted message history with pagination
- Simple room-based authorization

## Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + WebSocket
- **Database**: PostgreSQL`,
          liveUrl: "",
          repoUrl: "https://github.com/Achmad-R",
          coverImageUrl: "",
          techStack: ["React", "Node.js", "WebSocket", "PostgreSQL"],
          featured: true,
          published: true,
        },
        {
          title: "Weather Dashboard API",
          slug: "weather-dashboard-api",
          shortDescription:
            "A REST API that aggregates weather data from multiple providers, with caching, rate limits, and forecast endpoints.",
          content: `## Overview

A weather data aggregation API that normalizes responses from multiple weather providers behind a single, predictable REST interface.

## Features

- Aggregates data from multiple providers with fallback logic
- Response caching to reduce upstream load
- Per-key rate limiting
- Forecast and current-conditions endpoints

## Stack

- **Backend**: Go
- **Cache**: Redis
- **Deployment**: Docker + Fly.io`,
          liveUrl: "",
          repoUrl: "https://github.com/Achmad-R",
          coverImageUrl: "",
          techStack: ["Go", "Redis", "Docker", "REST API"],
          featured: false,
          published: true,
        },
      ],
    });
    console.log("3 placeholder projects seeded.");

    await prisma.blogPost.createMany({
      data: [
        {
          title: "Why I Moved My Portfolio to a Custom CMS",
          slug: "why-i-moved-to-a-custom-cms",
          excerpt:
            "Headless CMS platforms are great, but for a personal portfolio a custom, self-hosted admin panel was simpler and more fun to maintain.",
          content: `For years, updating my portfolio meant editing a \`projects.ts\` file and pushing a new deploy. That works — until you want to publish a blog post from your phone, or your mother asks to "just add a picture."

## The options I considered

- **A headless CMS**: powerful, but overkill for a single user and adds a monthly bill.
- **A static site generator**: great DX, but every content change is a build.
- **A custom CMS**: I control everything, and I get to dogfood my own stack.

## What I built instead

A single Next.js app with an admin panel. Content lives in Postgres, markdown is rendered server-side, and ISR means my edits go live in under a second thanks to on-demand revalidation.

## Lessons learned

1. **Revalidation beats rebuilds** — edits should be instant.
2. **Markdown in the DB** is simpler than MDX files for a personal blog.
3. **Don't over-engineer** — one admin user, no roles, no OAuth.

The whole thing is open source. You're reading it right now.`,
          coverImageUrl: "",
          tags: ["Next.js", "Architecture"],
          published: true,
        },
        {
          title: "Getting Started with Supabase Storage in Next.js",
          slug: "supabase-storage-nextjs",
          excerpt:
            "Uploading and serving images with Supabase Storage, next/image, and public buckets — a practical walkthrough with code.",
          content: `Supabase Storage is a S3-compatible object store that's trivial to wire up with Next.js. Here's the pattern I use for cover images in my CMS.

## 1. Create a public bucket

In the Supabase dashboard, create a bucket named \`covers\` with **public** visibility, then allow public read via a policy. Uploads happen server-side with the service role key, so clients never need write access.

## 2. Serve images with next/image

Add your project URL to \`images.remotePatterns\` in \`next.config.ts\`:

\`\`\`ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "*.supabase.co" },
  ],
}
\`\`\`

Then use \`<Image>\` with \`fill\` or fixed dimensions and Supabase's built-in image resizing.

## 3. Upload from a server action

\`\`\`ts
const { data, error } = await supabase.storage
  .from("covers")
  .upload(path, file, { upsert: true });
\`\`\`

## Watch out for

- **Service role keys are dangerous** — only use them server-side.
- **Deleted records leak files** — clean up objects when you delete a row.

That's it. Storage is the least glamorous but most reliable part of this whole stack.`,
          coverImageUrl: "",
          tags: ["Supabase", "Next.js"],
          published: true,
        },
      ],
    });
    console.log("2 placeholder blog posts seeded.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
