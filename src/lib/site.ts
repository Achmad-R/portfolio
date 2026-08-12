export const site = {
  name: "Achmad Ridho",
  tagline: "Fullstack Developer",
  email: "achmad.ridho.st@gmail.com",
  description:
    "Fullstack developer building web applications with Next.js, TypeScript, and modern backend tooling.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const POSTS_PER_PAGE = 6;
export const RSS_LIMIT = 10;
