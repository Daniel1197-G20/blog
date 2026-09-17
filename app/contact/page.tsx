"use client";
import { FormEvent, useState } from "react";
import Card from "@/components/common/Card/Card";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (!event.currentTarget.checkValidity()) return; setStatus("Thanks—your message is ready for the ForestBlog team. This assignment currently provides contact as a UI-only flow."); };
  return (
    <div className="grid gap-10 py-6 sm:py-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16"><section><p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-700">Contact</p><h1 className="mt-3 text-5xl font-bold tracking-[-0.05em] text-forest-950 dark:text-forest-50">Let&apos;s stay in touch.</h1><p className="mt-6 max-w-md text-lg leading-8 text-forest-800/75 dark:text-forest-100/70">Questions, feedback, or an idea worth sharing? We&apos;d love to hear from you.</p><dl className="mt-10 space-y-5 text-sm"><div><dt className="font-bold text-forest-950 dark:text-forest-50">Email</dt><dd className="mt-1 text-forest-800/70 dark:text-forest-100/70">hello@forestblog.example</dd></div><div><dt className="font-bold text-forest-950 dark:text-forest-50">Location</dt><dd className="mt-1 text-forest-800/70 dark:text-forest-100/70">Writing from everywhere</dd></div></dl></section><Card className="p-6 sm:p-8"><form onSubmit={submit} className="space-y-5"><Input label="Name" name="name" required placeholder="Your name"/><Input label="Email" name="email" type="email" required placeholder="you@example.com"/><div className="space-y-1.5"><label htmlFor="message" className="block text-sm font-semibold text-forest-900 dark:text-forest-100">Message</label><textarea id="message" name="message" required rows={6} placeholder="How can we help?" className="block w-full rounded-xl border border-forest-900/15 bg-white px-3.5 py-3 text-sm text-forest-950 outline-none placeholder:text-forest-800/40 focus:border-forest-600 focus:ring-4 focus:ring-forest-100 dark:border-forest-100/15 dark:bg-forest-950 dark:text-forest-50"/></div><Button type="submit">Send message</Button>{status && <p role="status" className="rounded-xl bg-forest-50 p-3 text-sm leading-6 text-forest-800 dark:bg-forest-900/50 dark:text-forest-100">{status}</p>}</form></Card></div>
  );
}
