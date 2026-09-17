import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/common/Navbar/Navbar";
import Link from "next/link";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f5f3" },
    { media: "(prefers-color-scheme: dark)", color: "#081411" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "ForestBlog | Thoughtful reading for curious people",
    template: "%s | ForestBlog",
  },
  description: "Thoughtful stories, practical notes, and fresh perspectives from ForestBlog.",
  openGraph: {
    type: "website",
    siteName: "ForestBlog",
    title: "ForestBlog",
    description: "Thoughtful reading for curious people.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-[100dvh] flex-col bg-background text-foreground antialiased selection:bg-forest-200 dark:selection:bg-forest-800">
        <Providers>
          <Navbar />
          <main className="flex-1">
            <div className="mx-auto max-w-7xl px-3.5 py-6 sm:px-6 sm:py-8 lg:px-8">
              {children}
            </div>
          </main>
          <footer className="border-t border-forest-900/10 bg-[#ebf1ee]/70 py-8 text-center text-xs sm:text-sm text-forest-800/70 dark:border-forest-800/30 dark:bg-[#0a1c16]/80 dark:text-forest-200/70">
            <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-lg bg-forest-700 text-xs font-bold text-white shadow-sm">
                  F
                </span>
                <span className="font-bold text-forest-950 dark:text-forest-100">
                  ForestBlog
                </span>
                <span className="text-xs text-forest-600 dark:text-forest-400">• Thoughtful reading</span>
              </div>

              <div className="flex items-center gap-5 text-xs font-medium">
                <Link href="/" className="hover:text-forest-950 dark:hover:text-white transition">Home</Link>
                <Link href="/blog" className="hover:text-forest-950 dark:hover:text-white transition">Articles</Link>
                <Link href="/about" className="hover:text-forest-950 dark:hover:text-white transition">About</Link>
                <Link href="/contact" className="hover:text-forest-950 dark:hover:text-white transition">Contact</Link>
              </div>

              <p className="text-xs text-forest-800/60 dark:text-forest-100/60">
                &copy; {new Date().getFullYear()} ForestBlog. Crafted for curious readers.
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
