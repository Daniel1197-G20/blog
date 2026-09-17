import apiClient from "./api";
import type { LoginCredentials, AuthResponse, User } from "@/types";

export type { LoginCredentials, AuthResponse, User };

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", credentials);
    const data = response.data;
    const token = data.token || data.accessToken || "";
    return {
      ...data,
      token,
    };
  },

  getCurrentUser: async (token?: string): Promise<User> => {
    const config = token
      ? {
          headers: {
            Authorization: token.startsWith("Bearer ")
              ? token
              : `Bearer ${token}`,
          },
        }
      : undefined;
    const response = await apiClient.get<User>("/auth/me", config);
    return response.data;
  },
};

export default authService;
