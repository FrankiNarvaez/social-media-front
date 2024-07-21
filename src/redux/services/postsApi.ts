
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


console.log(localStorage.getItem('token'));

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://social-media-api-1.onrender.com',
   prepareHeaders: (headers, { getState }) => {

    const token = localStorage.getItem('token');
    //const subtoken = token?.substring(1, token.length - 1); En caso de que de unauthorized es porque el token tiene comillas
    if (token) {
      const BearerToken = `Bearer ${token}`
      console.log(BearerToken);
      headers.set('Authorization', BearerToken);
      console.log(headers)
    }
    return headers;
   }}),
  endpoints: (builder) => ({

    createPost: builder.mutation({
      query: (body) => ({
        url: '/api/posts',
        method: 'POST',
        body,
      }),
    }),
    updatePost: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/posts/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/posts/${id}`,
        method: 'DELETE',
      }),
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `/api/posts/${id}/like`,
        method: 'POST',
      }),
    }),
    unlikePost: builder.mutation({
      query: (id) => ({
        url: `/api/posts/${id}/unlike`,
        method: 'POST',
      }),
    }),
    getPostsByUser: builder.query({
      query: (userId) => `/api/posts/user/${userId}`,
    }),
    getVisiblePostsByUser: builder.query({
      query: (userId) => `/api/posts/user/${userId}/visible`,
    }),
  }),
});

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useGetPostsByUserQuery,
  useGetVisiblePostsByUserQuery,
} = postsApi;
