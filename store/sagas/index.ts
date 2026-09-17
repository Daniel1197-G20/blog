import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import postsSaga from "./postsSaga";
import commentsSaga from "./commentsSaga";

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(postsSaga),
    fork(commentsSaga),
  ]);
}
