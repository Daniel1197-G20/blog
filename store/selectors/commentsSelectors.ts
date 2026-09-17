import type { RootState } from "../index";

export const selectCommentsState = (state: RootState) => state.comments;
export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsLoading = (state: RootState) => state.comments.isLoading;
export const selectCommentsSubmitting = (state: RootState) => state.comments.isSubmitting;
export const selectCommentsError = (state: RootState) => state.comments.error;
