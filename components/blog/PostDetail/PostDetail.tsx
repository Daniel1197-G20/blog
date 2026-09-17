"use client";

import React, { useEffect } from "react";
import Card from "@/components/common/Card/Card";
import Loader from "@/components/common/Loader/Loader";
import ErrorMessage from "@/components/common/ErrorMessage/ErrorMessage";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectPostsState } from "@/store/selectors/postsSelectors";
import { fetchPostByIdRequest, clearSelectedPost } from "@/store/slices/postsSlice";
import { postCategory, postImage, readingTime } from "@/utils/postPresentation";

export interface PostDetailProps { id?: string | number; }

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
    return <ErrorMessage message={error} onRetry={() => dispatch(fetchPostByIdRequest(id))} />;
  }

  if (isLoading || !isCurrentPost) {
    return <Loader label="Opening article…" className="py-20" />;
  }

  return <article className="mx-auto max-w-5xl"><Card className="overflow-hidden p-0">
    <div className="relative aspect-[16/8] bg-forest-100"><Image src={postImage(selectedPost.id)} alt="Natural landscape for this article" fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" /></div>
    <div className="space-y-7 p-6 md:p-10">
    <div className="border-b border-forest-900/10 pb-6 dark:border-forest-100/10">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-[0.16em] text-forest-700 dark:text-forest-300"><span>{postCategory(selectedPost)}</span><span className="h-1 w-1 rounded-full bg-forest-500" aria-hidden="true" /><span>{readingTime(selectedPost)}</span><span className="h-1 w-1 rounded-full bg-forest-500" aria-hidden="true" /><span>Contributor {selectedPost.userId}</span></div>
      <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-forest-950 sm:text-4xl dark:text-forest-50">{selectedPost.title}</h1>
      {selectedPost.tags && <div className="mt-5 flex flex-wrap gap-2">{selectedPost.tags.map((tag) => <span key={tag} className="rounded-full bg-forest-100 px-3 py-1 text-xs font-medium text-forest-800 dark:bg-forest-800 dark:text-forest-100">{tag}</span>)}</div>}
    </div>
    <div className="max-w-3xl text-[1.0625rem] leading-8 text-forest-900/85 dark:text-forest-100/85"><p>{selectedPost.body}</p></div>
    {selectedPost.reactions && <div className="flex gap-5 border-t border-forest-900/10 pt-5 text-sm text-forest-800/70 dark:border-forest-100/10 dark:text-forest-100/70"><span>{selectedPost.reactions.likes} likes</span><span>{selectedPost.reactions.dislikes} dislikes</span></div>}
    </div>
  </Card></article>;
};

export default PostDetail;
