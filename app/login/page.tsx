import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm/LoginForm";
import { Skeleton } from "@/components/common/Skeleton/Skeleton";
import ThemeToggle from "@/components/common/ThemeToggle/ThemeToggle";

export const metadata = {
  title: "Login",
  description: "Sign in to your ForestBlog account.",
};

function LoginSkeleton() {
  return (
    <div className="mt-8 space-y-6" aria-hidden="true">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="space-y-4 pt-2">
        <Skeleton className="h-12 w-full" rounded="xl" />
        <Skeleton className="h-12 w-full" rounded="xl" />
        <Skeleton className="h-12 w-full" rounded="xl" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative min-h-[calc(100dvh-12rem)] flex items-center justify-center py-4 sm:py-8 lg:py-12">
      {/* Full-bleed responsive wallpaper background covering all devices from mobile to 4K desktop */}
      <div className="fixed -inset-4 sm:-inset-6 z-0 overflow-hidden pointer-events-none min-h-[100dvh]" aria-hidden="true">
        {/* Light mode wallpaper: sunlit morning forest canopy with responsive vertical framing */}
        <Image
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=85"
          alt="Sunlight filtering through deep forest canopy"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-[50%_35%] sm:object-[50%_40%] md:object-center scale-105 transition-opacity duration-700 dark:hidden gpu-layer"
        />

        {/* Dark mode wallpaper: deep twilight nocturnal forest canopy with responsive vertical framing */}
        <Image
          src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1920&q=85"
          alt="Deep twilight nocturnal forest canopy under misty sky"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="hidden object-cover object-[50%_35%] sm:object-[50%_40%] md:object-center scale-105 transition-opacity duration-700 dark:block gpu-layer"
        />

        {/* Light mode ambient overlay: responsive layered frosted veil ensuring high text contrast while preserving tree imagery */}
        <div className="absolute inset-0 bg-[#ebf1ee]/50 backdrop-blur-[2px] sm:backdrop-blur-[3px] dark:hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f2f5f3] via-[#ebf1ee]/55 to-white/35 sm:from-[#f2f5f3]/95 sm:via-[#ebf1ee]/45 sm:to-white/20 dark:hidden" />

        {/* Dark mode ambient overlay: deep obsidian spruce with rich emerald pine shades */}
        <div className="absolute inset-0 hidden bg-[#081411]/75 backdrop-blur-[2px] sm:backdrop-blur-[3px] dark:block" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-[#05110d] via-[#09221a]/75 to-[#0e2d23]/45 sm:from-[#05110d]/95 sm:via-[#09221a]/70 sm:to-[#0e2d23]/35 dark:block" />
      </div>

      {/* Floating neomorphic glass card - responsive padding and radius across all screen sizes */}
      <div className="relative z-10 w-full max-w-[28rem] rounded-2xl sm:rounded-3xl neu-glass p-5 sm:p-8 md:p-9 shadow-2xl border border-white/50 dark:border-forest-700/30">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-lg font-bold tracking-[-0.03em] text-forest-950 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500 rounded-lg p-1"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest-700 text-sm font-bold text-white shadow-neu-flat-sm">
              F
            </span>
            <span>
              Forest<span className="text-forest-600 dark:text-forest-400">Blog</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:text-amber-200">
              Reader portal
            </span>
            <ThemeToggle size="sm" />
          </div>
        </div>

        <Suspense fallback={<LoginSkeleton />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
