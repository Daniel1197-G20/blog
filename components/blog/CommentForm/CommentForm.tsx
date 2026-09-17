"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Button from "@/components/common/Button/Button";
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
      <p className="rounded-xl bg-forest-50 px-4 py-3 text-sm text-forest-800 dark:bg-forest-900/50 dark:text-forest-100">
        <Link href="/login" className="font-bold underline">Sign in</Link> to add a note to this conversation.
      </p>
    );
  }
  return (
    <form onSubmit={submit} className="rounded-xl border border-forest-900/10 bg-forest-50/60 p-4 dark:border-forest-100/10 dark:bg-forest-900/20">
      <label htmlFor="comment" className="text-sm font-semibold text-forest-900 dark:text-forest-100">Add to the conversation</label>
      <textarea
        id="comment"
        value={body}
        onChange={(event) => setBody(event.target.value)}
        rows={3}
        maxLength={500}
        placeholder="Share a thoughtful response…"
        className="mt-2 block w-full resize-y rounded-xl border border-forest-900/15 bg-white px-3 py-2.5 text-sm text-forest-950 outline-none placeholder:text-forest-800/45 focus:border-forest-600 focus:ring-4 focus:ring-forest-100 dark:border-forest-100/15 dark:bg-forest-950 dark:text-forest-50"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "comment-error" : undefined}
      />
      {error && <p id="comment-error" className="mt-1 text-xs font-medium text-red-600">{error}</p>}
      <div className="mt-3 flex justify-end">
        <Button type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? "Posting…" : "Post comment"}
        </Button>
      </div>
    </form>
  );
}
