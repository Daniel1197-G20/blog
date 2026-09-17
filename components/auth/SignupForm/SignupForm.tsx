"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import Card from "@/components/common/Card/Card";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

export const SignupForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent) => { event.preventDefault(); setMessage("Account registration is not available through the current DummyJSON API. Please use an existing demo account to sign in."); };
  return (
    <Card variant="flat" className="mx-auto w-full max-w-md space-y-6 p-6 sm:p-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-forest-100 dark:bg-forest-900/60 px-3 py-1 text-xs font-semibold text-forest-800 dark:text-forest-200">
          <span>Reader Registration</span>
        </div>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-forest-950 dark:text-forest-50">
          Join the journal
        </h2>
        <p className="mt-2 text-sm text-forest-800/75 dark:text-forest-100/75">
          Create your reader profile when public registration opens.
        </p>
      </div>

      <form className="space-y-4" onSubmit={submit}>
        <Input label="Full name" id="signup-name" placeholder="Your full name" required />
        <Input label="Email address" id="signup-email" type="email" placeholder="you@example.com" required />
        <Input label="Password" id="signup-password" type="password" placeholder="Choose a secure password" required />
        <Button type="submit" variant="primary" size="lg" className="w-full">
          Request account access
        </Button>
      </form>
      {message && (
        <div
          role="status"
          className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs sm:text-sm leading-6 text-amber-900 dark:border-amber-700/50 dark:bg-amber-950/40 dark:text-amber-200"
        >
          <p>{message}</p>
          <div className="mt-2">
            <Link
              href="/login"
              className="font-bold underline hover:text-amber-950 dark:hover:text-white"
            >
              Go to sign in with demo credentials →
            </Link>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SignupForm;
