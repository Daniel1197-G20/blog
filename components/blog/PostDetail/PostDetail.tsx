"use client";

import React, { useEffect } from "react";
import Card from "@/components/common/Card/Card";
import ErrorMessage from "@/components/common/ErrorMessage/ErrorMessage";
import { PostDetailSkeleton } from "@/components/common/Skeleton/Skeleton";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectPostsState } from "@/store/selectors/postsSelectors";
import { fetchPostByIdRequest, clearSelectedPost } from "@/store/slices/postsSlice";
import { postCategory, postImage, readingTime, getCategoryStyle, getCategoryTone } from "@/utils/postPresentation";

export interface PostDetailProps {
  id?: string | number;
}

export const PostDetail: React.FC<PostDetailProps> = ({ id = "1" }) => {
  const dispatch = useAppDispatch();
  const { selectedPost, isLoading, error } = useAppSelector(selectPostsState);

  useEffect(() => {
    dispatch(fetchPostByIdRequest(id));
    return () => {
      dispatch(clearSelectedPost());
    };
  }, [dispatch, id]);

  const isCurrentPost = selectedPost && String(selectedPost.id) === String(id);

  if (error && !isCurrentPost) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => dispatch(fetchPostByIdRequest(id))}
      />
    );
  }

  if (isLoading || !isCurrentPost) {
    return <PostDetailSkeleton />;
  }

  const category = postCategory(selectedPost);
  const style = getCategoryStyle(category);
  const tone = getCategoryTone(category);

  return (
    <article className="mx-auto max-w-4xl">
      <div className="mb-5 flex items-center gap-2 text-xs sm:text-sm font-semibold text-forest-700 dark:text-forest-300">
        <Link href="/blog" className="hover:underline flex items-center gap-1">
          <span aria-hidden="true">←</span> Back to reading room
        </Link>
      </div>

      <Card
        variant="flat"
        tone={tone}
        className="overflow-hidden p-0 shadow-neu-flat dark:shadow-neu-flat-dark"
      >
        <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full bg-forest-900/10 dark:bg-forest-100/10">
          <Image
            src={postImage(selectedPost.id)}
            alt={`Banner for ${selectedPost.title}`}
            fill
            priority
            quality={80}
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover gpu-layer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-transparent" />
        </div>

        <div className="space-y-7 p-6 sm:p-10">
          <div className="border-b border-forest-900/10 pb-6 dark:border-forest-100/10">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${style.pillClass}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${style.dotColor}`} aria-hidden="true" />
                {category}
              </span>
              <span className="text-xs text-forest-800/60 dark:text-forest-100/60 font-medium">
                {readingTime(selectedPost)}
              </span>
              <span className="text-forest-400 dark:text-forest-600">•</span>
              <span className="text-xs text-forest-800/70 dark:text-forest-100/70 font-medium">
                Contributor {selectedPost.userId}
              </span>
            </div>

            <h1 className="mt-4 text-2xl sm:text-4xl font-bold tracking-[-0.04em] text-forest-950 dark:text-forest-50 leading-tight">
              {selectedPost.title}
            </h1>

            {selectedPost.tags && selectedPost.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {selectedPost.tags.map((tag) => {
                  const tagStyle = getCategoryStyle(tag);
                  return (
                    <span
                      key={tag}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${tagStyle.pillClass}`}
                    >
                      #{tag}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          <div className="prose prose-forest dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed sm:leading-8 text-forest-950/85 dark:text-forest-100/85">
            <p className="whitespace-pre-line">{selectedPost.body}</p>
          </div>

          {selectedPost.reactions && (
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-forest-900/10 pt-5 text-xs sm:text-sm text-forest-800/75 dark:border-forest-100/10 dark:text-forest-100/70">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-100/80 dark:bg-forest-900/60 px-3 py-1 font-semibold text-forest-900 dark:text-forest-100">
                  <svg className="h-4 w-4 text-forest-600 dark:text-forest-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  {selectedPost.reactions.likes ?? 0} likes
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-forest-800/60 dark:text-forest-100/60">
                  {selectedPost.reactions.dislikes ?? 0} dislikes
                </span>
              </div>
              <span className="text-xs text-forest-800/60 dark:text-forest-100/60">
                Published in Forest Journal
              </span>
            </div>
          )}
        </div>
      </Card>
    </article>
  );
};

export default PostDetail;
