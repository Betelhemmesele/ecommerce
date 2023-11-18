import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      typeof window === 'undefined'
        ? 'http://localhost:3000'
        : window.location.origin,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: 'http://localhost:3009/backend/users/login',
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      }),
    }),
    getAuthData: builder.query({
      query: ({ token }) => ({
        url: 'http://localhost:3009/backend/users/auth-details',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useGetAuthDataQuery } = authApi;