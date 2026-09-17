"use client";

import React, { useEffect } from "react";
import Card from "@/components/common/Card/Card";
import Loader from "@/components/common/Loader/Loader";
import ErrorMessage from "@/components/common/ErrorMessage/ErrorMessage";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectCommentsState } from "@/store/selectors/commentsSelectors";
import { fetchCommentsRequest } from "@/store/slices/commentsSlice";
import CommentForm from "../CommentForm/CommentForm";

export interface CommentSectionProps { postId?: string | number; }

export const CommentSection: React.FC<CommentSectionProps> = ({ postId = "1" }) => {
  const dispatch = useAppDispatch();
  const { comments, isLoading, error } = useAppSelector(selectCommentsState);

  useEffect(() => { dispatch(fetchCommentsRequest(postId)); }, [dispatch, postId]);

  if (isLoading && comments.length === 0) {
    return <Loader label="Loading the conversation…" className="py-10" />;
  }
  if (error && comments.length === 0) {
    return <ErrorMessage message={error} onRetry={() => dispatch(fetchCommentsRequest(postId))} />;
  }

  return (
    <section className="mx-auto mt-10 max-w-4xl space-y-4" aria-labelledby="comments-heading">
      <div className="flex items-baseline justify-between">
        <h3 id="comments-heading" className="text-xl font-semibold tracking-[-0.02em] text-forest-950 dark:text-forest-50">Reader notes</h3>
        <span className="text-sm text-forest-800/65 dark:text-forest-100/65">{comments.length} responses</span>
      </div>
      <CommentForm postId={postId} />
      {comments.length === 0 ? (
        <Card className="text-sm text-forest-800/70 dark:text-forest-100/70">There are no comments for this article yet.</Card>
      ) : (
        <Card className="space-y-4">
          {comments.map((comment, index) => (
            <article key={comment.id} className={index === comments.length - 1 ? "" : "border-b border-forest-900/10 pb-4 dark:border-forest-100/10"}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-forest-950 dark:text-forest-50">
                  {comment.user?.fullName || comment.user?.username || "Anonymous"}
                </p>
                {comment.likes !== undefined && <span className="text-xs text-forest-800/60 dark:text-forest-100/60">{comment.likes} likes</span>}
              </div>
              <p className="mt-2 text-sm leading-6 text-forest-800/80 dark:text-forest-100/75">{comment.body}</p>
            </article>
          ))}
        </Card>
      )}
    </section>
  );
};

export default CommentSection;
