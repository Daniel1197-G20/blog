import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCommentsRequest,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
} from "../slices/commentsSlice";
import { commentsService } from "@/lib/commentsService";
import { getErrorMessage } from "@/utils/helpers";
import type { Comment, CommentsResponse } from "@/types";

export function* handleFetchComments(
  action: ReturnType<typeof fetchCommentsRequest>
) {
  try {
    const response: CommentsResponse = yield call(
      commentsService.getCommentsByPostId,
      action.payload
    );
    yield put(fetchCommentsSuccess(response.comments));
  } catch (error) {
    const message = getErrorMessage(error, "Unable to load comments.");
    yield put(fetchCommentsFailure(message));
  }
}

export function* handleAddComment(action: ReturnType<typeof addCommentRequest>) {
  try {
    const comment: Comment = yield call(
      commentsService.addComment,
      action.payload
    );
    yield put(addCommentSuccess(comment));
  } catch (error) {
    const message = getErrorMessage(error, "Unable to add comment.");
    yield put(addCommentFailure(message));
  }
}

export function* commentsSaga() {
  yield all([
    takeLatest(fetchCommentsRequest.type, handleFetchComments),
    takeLatest(addCommentRequest.type, handleAddComment),
  ]);
}

export default commentsSaga;
