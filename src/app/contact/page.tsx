import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/contact-form";
import { PromptLine } from "@/components/prompt-line";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-16">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight">contact</h1>
        <PromptLine command={`ssh contact@${site.name.toLowerCase().replace(/\s+/g, "-")}`} />
        <p className="text-muted-foreground">
          Have a project in mind, or just want to say hi? Fill out the form below and
          I&apos;ll get back to you at {site.email}.
        </p>
      </div>

      <ContactForm />
    </div>
  );
}