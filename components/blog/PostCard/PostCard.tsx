import React from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "@/components/common/Card/Card";
import type { Post } from "@/types";
import { postCategory, postImage, readingTime, getCategoryStyle, getCategoryTone } from "@/utils/postPresentation";

export interface PostCardProps {
  post: Post;
  priority?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, priority = false }) => {
  const category = postCategory(post);
  const style = getCategoryStyle(category);
  const tone = getCategoryTone(category);

  return (
    <Card
      variant="flat"
      tone={tone}
      interactive
      className="card-lazy-render group flex h-full flex-col overflow-hidden p-0"
    >
      <Link
        href={`/blog/${post.id}`}
        className="relative block aspect-[16/9] overflow-hidden bg-forest-900/10 dark:bg-forest-100/10"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={postImage(post.id)}
          alt={`Banner for ${post.title}`}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          quality={75}
          sizes="(max-width: 640px) 94vw, (max-width: 1024px) 46vw, 380px"
          className="object-cover transition-transform duration-500 group-hover:scale-105 gpu-layer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          <div className="mb-3.5 flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.pillClass}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${style.dotColor}`} aria-hidden="true" />
              {category}
            </span>
            <span className="shrink-0 text-xs font-medium text-forest-800/60 dark:text-forest-100/60">
              {readingTime(post)}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold tracking-[-0.025em] text-forest-950 dark:text-forest-50 line-clamp-2 transition-colors group-hover:text-forest-700 dark:group-hover:text-forest-300">
            <Link href={`/blog/${post.id}`} className="focus:outline-none focus:underline">
              {post.title}
            </Link>
          </h3>

          <p className="mt-2.5 line-clamp-3 text-xs sm:text-sm leading-relaxed text-forest-800/75 dark:text-forest-100/70">
            {post.body}
          </p>
        </div>

        <div className="mt-5 sm:mt-6 flex items-center justify-between gap-3 border-t border-forest-900/10 pt-4 dark:border-forest-100/10">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-forest-200/80 text-[10px] font-bold text-forest-900 dark:bg-forest-800 dark:text-forest-100">
              {post.userId}
            </span>
            <span className="text-xs font-medium text-forest-800/70 dark:text-forest-100/70">
              Writer {post.userId}
            </span>
          </div>

          <Link
            href={`/blog/${post.id}`}
            className="inline-flex min-h-[36px] items-center gap-1 text-xs sm:text-sm font-bold text-forest-700 transition-colors hover:text-forest-900 dark:text-forest-300 dark:hover:text-white"
            aria-label={`Read article: ${post.title}`}
          >
            <span>Read</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
