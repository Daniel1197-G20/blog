import type { Post } from "@/types";

const editorialImages = [
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=75",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=75",
];

export interface CategoryStyle {
  pillClass: string;
  dotColor: string;
}

export function getCategoryTone(categoryOrTag?: string): "amber" | "terracotta" | "ocean" | "violet" | "forest" | "moss" | "sage" {
  const tag = (categoryOrTag || "").toLowerCase();
  if (tag.includes("history") || tag.includes("classic") || tag.includes("mystery")) {
    return "amber";
  }
  if (tag.includes("crime") || tag.includes("love") || tag.includes("life") || tag.includes("story")) {
    return "terracotta";
  }
  if (tag.includes("tech") || tag.includes("digital") || tag.includes("future") || tag.includes("code")) {
    return "ocean";
  }
  if (tag.includes("magical") || tag.includes("fiction") || tag.includes("art") || tag.includes("french") || tag.includes("english")) {
    return "violet";
  }
  if (tag.includes("nature") || tag.includes("garden") || tag.includes("earth") || tag.includes("wood")) {
    return "moss";
  }
  if (tag.includes("essay") || tag.includes("note") || tag.includes("journal") || tag.includes("read")) {
    return "sage";
  }
  return "forest";
}

export function getCategoryStyle(categoryOrTag?: string): CategoryStyle {
  const tag = (categoryOrTag || "").toLowerCase();
  if (tag.includes("history") || tag.includes("classic") || tag.includes("mystery")) {
    return {
      pillClass:
        "bg-amber-100/90 text-amber-900 border border-amber-300/60 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-600/40",
      dotColor: "bg-amber-500 dark:bg-amber-400",
    };
  }
  if (tag.includes("crime") || tag.includes("love") || tag.includes("life") || tag.includes("story")) {
    return {
      pillClass:
        "bg-terracotta-100/90 text-terracotta-900 border border-terracotta-300/60 dark:bg-terracotta-950/70 dark:text-terracotta-300 dark:border-terracotta-600/40",
      dotColor: "bg-terracotta-500 dark:bg-terracotta-400",
    };
  }
  if (tag.includes("tech") || tag.includes("digital") || tag.includes("future") || tag.includes("code")) {
    return {
      pillClass:
        "bg-ocean-100/90 text-ocean-900 border border-ocean-300/60 dark:bg-ocean-950/70 dark:text-ocean-300 dark:border-ocean-600/40",
      dotColor: "bg-ocean-500 dark:bg-ocean-400",
    };
  }
  if (tag.includes("magical") || tag.includes("fiction") || tag.includes("art") || tag.includes("french") || tag.includes("english")) {
    return {
      pillClass:
        "bg-violet-100/90 text-violet-900 border border-violet-300/60 dark:bg-violet-950/70 dark:text-violet-300 dark:border-violet-600/40",
      dotColor: "bg-violet-500 dark:bg-violet-400",
    };
  }
  if (tag.includes("nature") || tag.includes("garden") || tag.includes("earth") || tag.includes("wood")) {
    return {
      pillClass:
        "bg-moss-100/90 text-moss-900 border border-moss-300/60 dark:bg-moss-900/60 dark:text-moss-200 dark:border-moss-600/40",
      dotColor: "bg-moss-500 dark:bg-moss-400",
    };
  }
  if (tag.includes("essay") || tag.includes("note") || tag.includes("journal") || tag.includes("read")) {
    return {
      pillClass:
        "bg-sage-100/90 text-sage-900 border border-sage-300/60 dark:bg-sage-900/60 dark:text-sage-200 dark:border-sage-600/40",
      dotColor: "bg-sage-500 dark:bg-sage-400",
    };
  }
  return {
    pillClass:
      "bg-forest-100/90 text-forest-900 border border-forest-300/60 dark:bg-forest-900/70 dark:text-forest-200 dark:border-forest-600/40",
    dotColor: "bg-forest-500 dark:bg-mint-400",
  };
}

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
