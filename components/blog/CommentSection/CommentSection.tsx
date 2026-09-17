"use client";

import React, { useEffect } from "react";
import Card from "@/components/common/Card/Card";
import ErrorMessage from "@/components/common/ErrorMessage/ErrorMessage";
import { CommentSkeleton } from "@/components/common/Skeleton/Skeleton";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectCommentsState } from "@/store/selectors/commentsSelectors";
import { fetchCommentsRequest } from "@/store/slices/commentsSlice";
import CommentForm from "../CommentForm/CommentForm";

export interface CommentSectionProps {
  postId?: string | number;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId = "1" }) => {
  const dispatch = useAppDispatch();
  const { comments, isLoading, error } = useAppSelector(selectCommentsState);

  useEffect(() => {
    dispatch(fetchCommentsRequest(postId));
  }, [dispatch, postId]);

  return (
    <section className="mx-auto mt-10 max-w-4xl space-y-6" aria-labelledby="comments-heading">
      <div className="flex items-center justify-between border-b border-forest-900/10 pb-3 dark:border-forest-100/10">
        <div className="flex items-center gap-2">
          <h2 id="comments-heading" className="text-xl font-bold tracking-tight text-forest-950 dark:text-forest-50">
            Reader responses
          </h2>
          <span className="rounded-full bg-forest-100 px-2 py-0.5 text-xs font-semibold text-forest-800 dark:bg-forest-900/60 dark:text-forest-200">
            {comments.length}
          </span>
        </div>
      </div>

      <CommentForm postId={postId} />

      {isLoading && comments.length === 0 ? (
        <CommentSkeleton count={3} />
      ) : error && comments.length === 0 ? (
        <ErrorMessage
          message={error}
          onRetry={() => dispatch(fetchCommentsRequest(postId))}
        />
      ) : comments.length === 0 ? (
        <Card variant="flat" className="py-8 text-center text-sm text-forest-800/70 dark:text-forest-100/70">
          There are no reader notes for this article yet. Be the first to share your thoughts!
        </Card>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card
              key={comment.id}
              variant="flat"
              className="p-5 border border-white/60 dark:border-forest-800/30 shadow-neu-flat-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-forest-200/80 text-xs font-bold text-forest-900 dark:bg-forest-800 dark:text-forest-100 shadow-sm">
                    {(comment.user?.fullName || comment.user?.username || "U")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-forest-950 dark:text-forest-50">
                      {comment.user?.fullName || comment.user?.username || "Anonymous reader"}
                    </p>
                    <p className="text-[11px] text-forest-800/60 dark:text-forest-100/60">
                      Reader contributor
                    </p>
                  </div>
                </div>

                {comment.likes !== undefined && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-forest-700 dark:text-forest-300">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    {comment.likes}
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-forest-900/80 dark:text-forest-100/80">
                {comment.body}
              </p>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default CommentSection;
