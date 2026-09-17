import { all, call, put, takeLatest } from "redux-saga/effects";
import {
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
} from "../slices/postsSlice";
import { postsService } from "@/lib/postsService";
import { getErrorMessage } from "@/utils/helpers";
import type { Post, PostsResponse } from "@/types";

export function* handleFetchPosts(action: ReturnType<typeof fetchPostsRequest>) {
  try {
    let response: PostsResponse;
    if (action.payload?.q !== undefined) {
      response = yield call(
        postsService.searchPosts,
        action.payload.q,
        action.payload
      );
    } else {
      response = yield call(postsService.getPosts, action.payload);
    }
    yield put(fetchPostsSuccess(response));
  } catch (error) {
    const message = getErrorMessage(error, "Unable to load posts. Please try again.");
    yield put(fetchPostsFailure(message));
  }
}

export function* handleFetchPostById(action: ReturnType<typeof fetchPostByIdRequest>) {
  try {
    const post: Post = yield call(postsService.getPostById, action.payload);
    yield put(fetchPostByIdSuccess(post));
  } catch (error) {
    const message = getErrorMessage(error, "Unable to load this post.");
    yield put(fetchPostByIdFailure(message));
  }
}

export function* handleCreatePost(action: ReturnType<typeof createPostRequest>) {
  try {
    const post: Post = yield call(postsService.createPost, action.payload);
    yield put(createPostSuccess(post));
  } catch (error) {
    const message = getErrorMessage(error, "Unable to create the post.");
    yield put(createPostFailure(message));
  }
}

export function* handleUpdatePost(action: ReturnType<typeof updatePostRequest>) {
  try {
    const post: Post = yield call(
      postsService.updatePost,
      action.payload.id,
      action.payload.data
    );
    yield put(updatePostSuccess(post));
  } catch (error) {
    const message = getErrorMessage(error, "Unable to update the post.");
    yield put(updatePostFailure(message));
  }
}

export function* handleDeletePost(action: ReturnType<typeof deletePostRequest>) {
  try {
    yield call(postsService.deletePost, action.payload);
    yield put(deletePostSuccess(action.payload));
  } catch (error) {
    const message = getErrorMessage(error, "Unable to delete the post.");
    yield put(deletePostFailure(message));
  }
}

export function* postsSaga() {
  yield all([
    takeLatest(fetchPostsRequest.type, handleFetchPosts),
    takeLatest(fetchPostByIdRequest.type, handleFetchPostById),
    takeLatest(createPostRequest.type, handleCreatePost),
    takeLatest(updatePostRequest.type, handleUpdatePost),
    takeLatest(deletePostRequest.type, handleDeletePost),
  ]);
}

export default postsSaga;
