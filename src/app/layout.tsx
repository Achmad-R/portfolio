import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "variable",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.tagline}`,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        {/*
          THESIS: The homepage is an open project stage, not a resume: its first screen reserves the largest surface for one verifiable case study and refuses generic portfolio filler.
          OWN-WORLD: Inherit the black-and-white Figma-derived system, using one pastel work panel, hairlines, rounded containers, pill actions, and mono metadata.
          STORY: A recruiter understands Achmad as an end-to-end product builder, sees where verified work will live, opens a case study when one is published, then contacts him.
          FIRST VIEWPORT: Identity and action sit left; a dominant flagship stage sits right. With no verified project, it becomes an honest reserved slot without fabricated imagery or claims.
          FORM: Flagship Stage, surface candidate 3 of 7, seed a7ceb518, code-led.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
        */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
