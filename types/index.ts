// User & Authentication Types
export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  token: string;
  accessToken?: string;
  refreshToken?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
}

// Post & Posts State Types
export interface PostReactions {
  likes: number;
  dislikes: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags?: string[];
  reactions?: PostReactions;
  views?: number;
  userId: number;
}

export interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
  total: number;
  skip: number;
  limit: number;
  isLoading: boolean;
  error: string | null;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface FetchPostsParams {
  limit?: number;
  skip?: number;
  q?: string;
}

export interface CreatePostPayload {
  title: string;
  body: string;
  userId: number;
  tags?: string[];
}

export interface UpdatePostPayload {
  id: number | string;
  data: Partial<Post>;
}

export interface DeletePostResponse {
  id: number;
  isDeleted: boolean;
  deletedOn?: string;
  [key: string]: unknown;
}

// Comment & Comments State Types
export interface CommentUser {
  id?: number;
  username?: string;
  fullName?: string;
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  likes?: number;
  user?: CommentUser;
}

export interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
  isSubmitting?: boolean;
  error: string | null;
}

export interface CommentsResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}

export interface AddCommentPayload {
  postId: number | string;
  body: string;
  userId?: number;
}

// UI State Types
export interface UINotification {
  type: "success" | "error" | "info";
  message: string;
}

export interface UIState {
  theme: "light" | "dark";
  notification: UINotification | null;
  isModalOpen: boolean;
}
