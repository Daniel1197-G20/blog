"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Button from "@/components/common/Button/Button";
import Card from "@/components/common/Card/Card";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectAuthState } from "@/store/selectors/authSelectors";
import { selectCommentsState } from "@/store/selectors/commentsSelectors";
import { addCommentRequest } from "@/store/slices/commentsSlice";

export default function CommentForm({ postId }: { postId: string | number }) {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(selectAuthState);
  const { isSubmitting } = useAppSelector(selectCommentsState);
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!body.trim()) return setError("Write a comment before submitting.");
    dispatch(addCommentRequest({ postId, body: body.trim(), userId: user?.id }));
    setBody("");
    setError("");
  };

  if (!isAuthenticated) {
    return (
      <Card variant="flat" className="p-4 sm:p-5 border border-white/60 dark:border-forest-800/30">
        <p className="text-xs sm:text-sm text-forest-800/80 dark:text-forest-100/80">
          <Link
            href="/login"
            className="font-bold text-forest-700 underline hover:text-forest-900 dark:text-forest-300 dark:hover:text-white"
          >
            Sign in
          </Link>{" "}
          to add your perspective to this conversation.
        </p>
      </Card>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl neu-flat p-4 sm:p-5 border border-white/70 dark:border-forest-800/40">
      <label
        htmlFor="comment"
        className="block text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-forest-100"
      >
        Leave a note
      </label>
      <textarea
        id="comment"
        value={body}
        onChange={(event) => setBody(event.target.value)}
        rows={3}
        maxLength={500}
        placeholder="Share a constructive, thoughtful reaction…"
        className="mt-2 block w-full resize-y rounded-xl border border-white/60 bg-[#e4eae6] px-4 py-3 text-base sm:text-sm text-forest-950 shadow-neu-inset outline-none transition placeholder:text-forest-800/45 focus:border-forest-600 focus:bg-white focus:ring-4 focus:ring-forest-500/15 dark:border-forest-700/40 dark:bg-[#071914] dark:text-forest-50 dark:shadow-neu-inset-dark dark:placeholder:text-forest-200/40 dark:focus:border-forest-400 dark:focus:bg-[#0d271f]"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "comment-error" : undefined}
      />
      {error && (
        <p id="comment-error" className="mt-1.5 text-xs font-medium text-terracotta-600 dark:text-terracotta-400">
          {error}
        </p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-forest-800/50 dark:text-forest-100/50">
          {500 - body.length} characters left
        </span>
        <Button type="submit" size="sm" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Posting…" : "Post reaction"}
        </Button>
      </div>
    </form>
  );
}
