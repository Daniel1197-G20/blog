import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm/LoginForm";

export const metadata = {
  title: "Login",
  description: "Sign in to your ForestBlog account.",
};

export default function LoginPage() {
  return (
    <div className="-mx-4 -my-8 min-h-[calc(100dvh-8rem)] overflow-hidden bg-white sm:-mx-6 lg:-mx-8 dark:bg-forest-950">
      <div className="grid min-h-[calc(100dvh-8rem)] lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
        <section className="order-2 flex items-center justify-center px-5 py-10 sm:px-10 lg:order-1 lg:px-12 xl:px-20">
          <div className="w-full max-w-[27rem]">
            <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-[-0.045em] text-forest-950 dark:text-forest-50">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-forest-800 text-sm text-white">F</span>
              Forest<span className="text-forest-700 dark:text-forest-300">Blog</span>
            </Link>
            <Suspense fallback={<div className="mt-10 h-96 w-full animate-pulse rounded-2xl bg-forest-100" />}><LoginForm /></Suspense>
          </div>
        </section>
        <aside className="relative order-1 min-h-52 overflow-hidden bg-forest-900 lg:order-2 lg:min-h-0" aria-label="Forest landscape">
          <Image src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=88" alt="A sunlit forest landscape" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          <div className="absolute inset-0 bg-forest-950/20" />
          <div className="absolute inset-x-6 bottom-6 hidden max-w-sm text-white sm:block lg:bottom-10 lg:left-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/75">ForestBlog</p>
            <p className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.035em]">A little more room to think.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
