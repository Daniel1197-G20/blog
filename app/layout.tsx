import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/common/Navbar/Navbar";

export const metadata: Metadata = {
  title: { default: "ForestBlog | Thoughtful reading for curious people", template: "%s | ForestBlog" },
  description: "Thoughtful stories, practical notes, and fresh perspectives from ForestBlog.",
  openGraph: { type: "website", siteName: "ForestBlog", title: "ForestBlog", description: "Thoughtful reading for curious people." },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-[100dvh] flex-col bg-[#f7f8f5] text-forest-950 antialiased dark:bg-forest-950 dark:text-forest-50">
        <Providers>
          <Navbar />
          <main className="flex-1">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <footer className="border-t border-forest-900/10 bg-[#f7f8f5] py-6 text-center text-sm text-forest-800/70 dark:border-forest-100/10 dark:bg-forest-950 dark:text-forest-200/70">
            <div className="mx-auto max-w-7xl px-4">
              &copy; {new Date().getFullYear()} ForestBlog. Thoughtful reading for curious people.
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
