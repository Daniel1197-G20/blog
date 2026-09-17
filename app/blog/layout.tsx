import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  description: "Thoughtful stories, practical notes, and fresh perspectives from ForestBlog.",
};

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
