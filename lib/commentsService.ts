import apiClient from "./api";
import type {
  Comment,
  CommentUser,
  CommentsResponse,
  AddCommentPayload,
} from "@/types";

export type {
  Comment,
  CommentUser,
  CommentsResponse,
  AddCommentPayload,
};

export const commentsService = {
  getCommentsByPostId: async (
    postId: number | string
  ): Promise<CommentsResponse> => {
    const response = await apiClient.get<CommentsResponse>(
      `/posts/${postId}/comments`
    );
    return response.data;
  },

  getAllComments: async (params?: {
    limit?: number;
    skip?: number;
  }): Promise<CommentsResponse> => {
    const response = await apiClient.get<CommentsResponse>("/comments", {
      params,
    });
    return response.data;
  },

  addComment: async (commentData: AddCommentPayload): Promise<Comment> => {
    const response = await apiClient.post<Comment>("/comments/add", {
      body: commentData.body,
      postId: Number(commentData.postId),
      userId: commentData.userId ?? 1,
    });
    return {
      ...response.data,
      likes: response.data.likes ?? 0,
    };
  },
};

export default commentsService;
