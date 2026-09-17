import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserFailure,
} from "../slices/authSlice";
import { authService } from "@/lib/authService";
import { setAuthToken } from "@/lib/api";
import { getErrorMessage } from "@/utils/helpers";
import type { AuthResponse, User } from "@/types";
import type { RootState } from "../index";

export function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const response: AuthResponse = yield call(authService.login, action.payload);
    setAuthToken(response.token);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("forestblog_token", response.token);
      document.cookie = `forestblog_token=${encodeURIComponent(response.token)}; path=/; max-age=604800; samesite=lax`;
    }
    yield put(loginSuccess(response));
  } catch (error) {
    const message = getErrorMessage(error, "Invalid username or password.");
    yield put(loginFailure(message));
  }
}

export function* handleGetCurrentUser(
  action: ReturnType<typeof getCurrentUserRequest>
) {
  try {
    let token = action.payload;
    if (!token) {
      const stateToken: string | null = yield select(
        (state: RootState) => state.auth.token
      );
      if (stateToken) {
        token = stateToken;
      }
    }
    const user: User = yield call(authService.getCurrentUser, token);
    if (token) {
      setAuthToken(token);
    }
    yield put(getCurrentUserSuccess(user));
  } catch (error) {
    setAuthToken(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("forestblog_token");
      document.cookie = "forestblog_token=; path=/; max-age=0; samesite=lax";
    }
    const message = getErrorMessage(error, "Unable to load user profile.");
    yield put(getCurrentUserFailure(message));
  }
}

export function* handleLogout(_action: ReturnType<typeof logoutRequest>) {
  try {
    setAuthToken(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("forestblog_token");
      document.cookie = "forestblog_token=; path=/; max-age=0; samesite=lax";
    }
    yield put(logoutSuccess());
  } catch {
    setAuthToken(null);
    yield put(logoutSuccess());
  }
}

export function* authSaga() {
  yield all([
    takeLatest(loginRequest.type, handleLogin),
    takeLatest(getCurrentUserRequest.type, handleGetCurrentUser),
    takeLatest(logoutRequest.type, handleLogout),
  ]);
}

export default authSaga;
