import apiClient from "./api";
import type {
  Post,
  PostReactions,
  PostsResponse,
  FetchPostsParams,
  CreatePostPayload,
  UpdatePostPayload,
  DeletePostResponse,
} from "@/types";

export type {
  Post,
  PostReactions,
  PostsResponse,
  FetchPostsParams,
  CreatePostPayload,
  UpdatePostPayload,
  DeletePostResponse,
};

export const postsService = {
  getPosts: async (params?: FetchPostsParams): Promise<PostsResponse> => {
    const response = await apiClient.get<PostsResponse>("/posts", {
      params: {
        limit: params?.limit,
        skip: params?.skip,
      },
    });
    return response.data;
  },

  getPostById: async (id: number | string): Promise<Post> => {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  },

  searchPosts: async (
    query: string,
    params?: FetchPostsParams
  ): Promise<PostsResponse> => {
    const response = await apiClient.get<PostsResponse>("/posts/search", {
      params: {
        q: query,
        limit: params?.limit,
        skip: params?.skip,
      },
    });
    return response.data;
  },

  getPostsByUser: async (
    userId: number | string,
    params?: FetchPostsParams
  ): Promise<PostsResponse> => {
    const response = await apiClient.get<PostsResponse>(`/posts/user/${userId}`, {
      params: {
        limit: params?.limit,
        skip: params?.skip,
      },
    });
    return response.data;
  },

  createPost: async (postData: CreatePostPayload): Promise<Post> => {
    const response = await apiClient.post<Post>("/posts/add", postData);
    return response.data;
  },

  updatePost: async (
    id: number | string,
    postData: Partial<Post>
  ): Promise<Post> => {
    const response = await apiClient.put<Post>(`/posts/${id}`, postData);
    return response.data;
  },

  deletePost: async (id: number | string): Promise<DeletePostResponse> => {
    const response = await apiClient.delete<DeletePostResponse>(`/posts/${id}`);
    return response.data;
  },
};

export default postsService;
