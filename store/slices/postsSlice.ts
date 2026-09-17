import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  PostsState,
  Post,
  PostsResponse,
  FetchPostsParams,
  CreatePostPayload,
  UpdatePostPayload,
} from "@/types";

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  total: 0,
  skip: 0,
  limit: 10,
  isLoading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPostsRequest: (state, _action: PayloadAction<FetchPostsParams | undefined>) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action: PayloadAction<PostsResponse>) => {
      state.posts = action.payload.posts;
      state.total = action.payload.total;
      state.skip = action.payload.skip;
      state.limit = action.payload.limit;
      state.isLoading = false;
      state.error = null;
    },
    fetchPostsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchPostByIdRequest: (state, _action: PayloadAction<number | string>) => {
      state.isLoading = true;
      state.error = null;
      state.selectedPost = null;
    },
    fetchPostByIdSuccess: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchPostByIdFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createPostRequest: (state, _action: PayloadAction<CreatePostPayload>) => {
      state.isLoading = true;
      state.error = null;
    },
    createPostSuccess: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
      state.total += 1;
      state.isLoading = false;
      state.error = null;
    },
    createPostFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updatePostRequest: (state, _action: PayloadAction<UpdatePostPayload>) => {
      state.isLoading = true;
      state.error = null;
    },
    updatePostSuccess: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      if (state.selectedPost?.id === action.payload.id) {
        state.selectedPost = action.payload;
      }
      state.isLoading = false;
      state.error = null;
    },
    updatePostFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deletePostRequest: (state, _action: PayloadAction<number | string>) => {
      state.isLoading = true;
      state.error = null;
    },
    deletePostSuccess: (state, action: PayloadAction<number | string>) => {
      state.posts = state.posts.filter((p) => p.id !== Number(action.payload));
      state.total = Math.max(0, state.total - 1);
      if (state.selectedPost?.id === Number(action.payload)) {
        state.selectedPost = null;
      }
      state.isLoading = false;
      state.error = null;
    },
    deletePostFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearPostsError: (state) => {
      state.error = null;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
});

export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  fetchPostByIdRequest,
  fetchPostByIdSuccess,
  fetchPostByIdFailure,
  createPostRequest,
  createPostSuccess,
  createPostFailure,
  updatePostRequest,
  updatePostSuccess,
  updatePostFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
  clearPostsError,
  clearSelectedPost,
} = postsSlice.actions;

export default postsSlice.reducer;
