
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


console.log(localStorage.getItem('token'));

export const editProfileApi = createApi({
    reducerPath: 'editProfileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://social-media-api-1.onrender.com',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');
            if (token) {
                const BearerToken = `Bearer ${token}`
                headers.set('Authorization', BearerToken);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        editProfilev2: builder.mutation({
            query: ({ body, id }) => ({
                url: `/api/users/${id}`,
                method: 'PATCH',
                body,
            }),
        })
    }),
});


export const {
    useEditProfilev2Mutation,
} = editProfileApi;

