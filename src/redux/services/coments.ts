import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://social-media-api-1.onrender.com' }),
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query({
      query: (postId) => ({
        url: `/api/posts/${postId}/comments`,
      }),
    }),

    addComment: builder.mutation({
      query: ({ postId, body }) => ({
        url: `/api/posts/${postId}/comments`,
        method: 'POST',
        body,
      }),
    }),

    updateComment: builder.mutation({
      query: ({ postId, commentId, body }) => ({
        url: `/api/posts/${postId}/comments/${commentId}`,
        method: 'PATCH',
        body,
      }),
    }),

    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `/api/posts/${postId}/comments/${commentId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCommentsByPostIdQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
