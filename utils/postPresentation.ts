import type { Post } from "@/types";

const editorialImages = [
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85",
];

export function postImage(id: number | string | undefined | null): string {
  const numId = Number(id);
  if (isNaN(numId) || numId < 1) {
    return editorialImages[0];
  }
  const index = Math.abs(numId - 1) % editorialImages.length;
  return editorialImages[index] || editorialImages[0];
}

export function postCategory(post?: Partial<Post> | null): string {
  if (!post) return "Field notes";
  return post.tags?.[0] ? post.tags[0].replace(/\b\w/g, (letter) => letter.toUpperCase()) : "Field notes";
}

export function readingTime(post?: Partial<Post> | null): string {
  const bodyText = typeof post?.body === "string" ? post.body.trim() : "";
  if (!bodyText) return "1 min read";
  return `${Math.max(1, Math.ceil(bodyText.split(/\s+/).length / 45))} min read`;
}
