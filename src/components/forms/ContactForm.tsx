"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMessage(body.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-md bg-brand-light px-4 py-3 text-brand-dark">
        Thanks for reaching out — we&apos;ve received your message and will get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
        />
      </div>

      {status === "error" && <p className="text-sm text-accent">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-brand px-5 py-2.5 text-sm font-bold uppercase text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
