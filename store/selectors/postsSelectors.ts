import type { RootState } from "../index";

export const selectPostsState = (state: RootState) => state.posts;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectSelectedPost = (state: RootState) => state.posts.selectedPost;
export const selectPostsTotal = (state: RootState) => state.posts.total;
export const selectPostsSkip = (state: RootState) => state.posts.skip;
export const selectPostsLimit = (state: RootState) => state.posts.limit;
export const selectPostsLoading = (state: RootState) => state.posts.isLoading;
export const selectPostsError = (state: RootState) => state.posts.error;
