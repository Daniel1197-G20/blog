import React from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "@/components/common/Card/Card";
import type { Post } from "@/types";
import { postCategory, postImage, readingTime } from "@/utils/postPresentation";

export interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:border-forest-600/40 hover:shadow-lg dark:hover:border-forest-300/40">
      <Link href={`/blog/${post.id}`} className="relative block aspect-[16/9] overflow-hidden bg-forest-100">
        <Image src={postImage(post.id)} alt="Lush natural landscape" fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
      <div>
        <div className="mb-4 flex items-center justify-between gap-3 text-xs font-semibold">
          <span className="rounded-full bg-forest-100 px-2.5 py-1 text-forest-800 dark:bg-forest-800 dark:text-forest-100">{postCategory(post)}</span>
          <span className="shrink-0 text-forest-800/60 dark:text-forest-100/60">{readingTime(post)}</span>
        </div>
        <h3 className="text-xl font-semibold tracking-[-0.025em] text-forest-950 dark:text-forest-50">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-forest-800/75 dark:text-forest-100/70">
          {post.body}
        </p>
      </div>
      <div className="mt-6 flex items-end justify-between gap-3">
        <span className="text-xs font-medium text-forest-800/60 dark:text-forest-100/60">By contributor {post.userId}</span>
        <Link
          href={`/blog/${post.id}`}
          className="shrink-0 text-sm font-semibold text-forest-700 transition-colors hover:text-forest-900 dark:text-forest-300 dark:hover:text-forest-100"
        >
          Read article <span aria-hidden="true">→</span>
        </Link>
      </div>
      </div>
    </Card>
  );
};

export default PostCard;
