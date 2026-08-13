"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactSchema } from "@/lib/contact-schema";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lastError, setLastError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      name: form.get("name")?.toString() ?? "",
      email: form.get("email")?.toString() ?? "",
      subject: form.get("subject")?.toString() ?? "",
      message: form.get("message")?.toString() ?? "",
      website: form.get("website")?.toString() ?? "",
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        next[issue.path[0] as string] = issue.message;
      }
      setErrors(next);
      return;
    }

    setState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) {
        setState("success");
        setLastError(null);
        formEl.reset();
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setLastError(`HTTP ${res.status}`);
        setState("error");
      }
    } catch (err) {
      setLastError(
        err instanceof Error ? `${err.name}: ${err.message}` : String(err)
      );
      setState("error");
    }
  }

  const field = (
    key: keyof typeof formData,
    label: string,
    type: "text" | "email" = "text"
  ) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor={key}>{label}</Label>
      <Input
        id={key}
        name={key}
        type={type}
        value={formData[key]}
        onChange={(e) => setFormData((f) => ({ ...f, [key]: e.target.value }))}
        aria-invalid={Boolean(errors[key])}
      />
      {errors[key] && <p className="text-xs text-destructive">{errors[key]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Honeypot field — must stay empty (hidden from humans) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "Name")}
        {field("email", "Email", "email")}
      </div>
      {field("subject", "Subject")}
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Sending..." : "Send message"}
        </Button>
        {state === "success" && (
          <span className="text-sm font-semibold text-success-deep">
            Message sent — I&apos;ll get back to you soon.
          </span>
        )}
        {state === "error" && (
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-destructive">
              Something went wrong. Try again in a few minutes.
            </p>
            {lastError && (
              <p className="text-xs text-muted-foreground">{lastError}</p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
