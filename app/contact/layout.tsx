import type { Metadata } from "next";
export const metadata: Metadata = { title: "Contact", description: "Get in touch with ForestBlog." };
export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
