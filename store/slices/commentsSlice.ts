import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CommentsState, Comment, CommentsResponse, AddCommentPayload } from "@/types";

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  isSubmitting: false,
  error: null,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchCommentsRequest: (state, _action: PayloadAction<number | string>) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchCommentsSuccess: (
      state,
      action: PayloadAction<Comment[] | CommentsResponse>
    ) => {
      state.comments = Array.isArray(action.payload)
        ? action.payload
        : action.payload.comments;
      state.isLoading = false;
      state.error = null;
    },
    fetchCommentsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addCommentRequest: (state, _action: PayloadAction<AddCommentPayload>) => {
      state.isSubmitting = true;
      state.error = null;
    },
    addCommentSuccess: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
      state.isSubmitting = false;
      state.error = null;
    },
    addCommentFailure: (state, action: PayloadAction<string>) => {
      state.isSubmitting = false;
      state.error = action.payload;
    },
    clearCommentsError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchCommentsRequest,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
  clearCommentsError,
} = commentsSlice.actions;

export default commentsSlice.reducer;
