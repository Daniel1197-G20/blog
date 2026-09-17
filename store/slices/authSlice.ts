import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User, LoginCredentials, AuthResponse } from "@/types";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<LoginCredentials>) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string } | AuthResponse>
    ) => {
      if ("user" in action.payload) {
        state.user = action.payload.user;
        state.token = action.payload.token;
      } else {
        const { token, accessToken, ...userData } = action.payload;
        state.user = {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          gender: userData.gender,
          image: userData.image,
        };
        state.token = token || accessToken || null;
      }
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    getCurrentUserRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      if (action.payload) {
        state.token = action.payload;
      }
      state.isLoading = true;
      state.error = null;
    },
    getCurrentUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    getCurrentUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
