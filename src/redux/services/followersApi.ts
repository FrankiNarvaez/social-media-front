import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const followersApi = createApi ({
  reducerPath: 'followersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://social-media-api-1.onrender.com' }),
  endpoints: (builder) => ({ 
    followers: builder.mutation({
      query: (body) => ({
        url: `/api/followers`,
        method: 'POST',
        body,
      }),
    }),
    getfollowed: builder.query({
      query: (id) => ({
        url: `/api/followers/followings/${id}`,
      }),
    }),
    getfollowers: builder.query({
      query: (id) => ({
        url: `/api/followers/followers/${id}`,
      }),
    }),
    deleteFollower: builder.mutation({
      query: (id) => ({
        url: `/api/followers/${id}`,
        method: 'DELETE',
      }),
    }),
  })
})

export const { 
  useFollowersMutation, 

  useGetfollowedQuery, 
  useGetfollowersQuery, 
  
  useDeleteFollowerMutation 
} = followersApi