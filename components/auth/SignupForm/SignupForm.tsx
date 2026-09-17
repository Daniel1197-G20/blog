"use client";

import React, { FormEvent, useState } from "react";
import Card from "@/components/common/Card/Card";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

export const SignupForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent) => { event.preventDefault(); setMessage("Account registration is not available through the current DummyJSON API. Please use an existing demo account to sign in."); };
  return (
    <Card className="mx-auto w-full max-w-md space-y-6 p-7 sm:p-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-forest-700">ForestBlog</p><h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-forest-950 dark:text-forest-50">Join the journal</h2><p className="mt-2 text-sm text-forest-800/70 dark:text-forest-100/70">Create your reader profile when registration becomes available.</p>
      </div>

      <form className="space-y-4" onSubmit={submit}>
        <Input label="Full name" id="signup-name" placeholder="Your full name" required />
        <Input label="Email address" id="signup-email" type="email" placeholder="you@example.com" required />
        <Input label="Password" id="signup-password" type="password" placeholder="Choose a secure password" required />
        <Button type="submit" className="w-full">Request account access</Button>
      </form>
      {message && <p role="status" className="rounded-xl bg-forest-50 p-3 text-sm leading-6 text-forest-800 dark:bg-forest-900/50 dark:text-forest-100">{message}</p>}
    </Card>
  );
};

export default SignupForm;
