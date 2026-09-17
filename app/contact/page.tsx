"use client";

import { FormEvent, useState } from "react";
import Card from "@/components/common/Card/Card";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) return;
    setStatus(
      "Thank you—your message has been recorded. Our editorial team usually responds within two business days."
    );
  };

  return (
    <div className="grid gap-10 py-4 sm:py-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 items-start">
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-forest-100/90 px-3.5 py-1 text-xs font-semibold text-forest-800 dark:bg-forest-900/60 dark:text-forest-200">
          <span>Get in touch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-[-0.04em] text-forest-950 dark:text-forest-50 leading-tight">
          Let&apos;s stay in touch.
        </h1>
        <p className="max-w-md text-base sm:text-lg leading-relaxed text-forest-800/80 dark:text-forest-100/75">
          Questions, feedback, or an essay proposal? We read every submission and would love to hear from you.
        </p>

        <dl className="mt-8 space-y-4 text-sm">
          <Card variant="flat" className="p-4 border border-white/60 dark:border-forest-800/30">
            <dt className="text-xs font-bold uppercase tracking-wider text-forest-700 dark:text-forest-300">
              Editorial Inquiries
            </dt>
            <dd className="mt-1 font-semibold text-forest-950 dark:text-forest-50">
              editor@forestblog.example
            </dd>
          </Card>
          <Card variant="flat" className="p-4 border border-white/60 dark:border-forest-800/30">
            <dt className="text-xs font-bold uppercase tracking-wider text-forest-700 dark:text-forest-300">
              Distribution & Studio
            </dt>
            <dd className="mt-1 font-semibold text-forest-950 dark:text-forest-50">
              Writing from independent spaces worldwide
            </dd>
          </Card>
        </dl>
      </section>

      <Card
        variant="flat"
        className="p-6 sm:p-9 border border-white/70 dark:border-forest-800/40 shadow-neu-flat"
      >
        <form onSubmit={submit} className="space-y-5">
          <Input label="Your name" name="name" required placeholder="e.g. Jane Doe" />
          <Input label="Email address" name="email" type="email" required placeholder="you@example.com" />

          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-forest-900 dark:text-forest-100"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="What would you like to discuss with the journal?"
              className="block w-full rounded-xl border border-white/60 bg-[#e4eae6] px-4 py-3 text-base sm:text-sm text-forest-950 shadow-neu-inset outline-none transition placeholder:text-forest-800/45 focus:border-forest-600 focus:bg-white focus:ring-4 focus:ring-forest-500/15 dark:border-forest-700/40 dark:bg-[#071914] dark:text-forest-50 dark:shadow-neu-inset-dark dark:placeholder:text-forest-200/40 dark:focus:border-forest-400 dark:focus:bg-[#0d271f]"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
            Send dispatch
          </Button>

          {status && (
            <div
              role="status"
              className="rounded-xl border border-forest-300/80 bg-forest-100/80 p-4 text-xs sm:text-sm leading-relaxed text-forest-950 dark:border-forest-700/60 dark:bg-forest-900/60 dark:text-forest-100"
            >
              {status}
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}
