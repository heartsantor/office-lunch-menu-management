import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL as string,
  }), // Type assertion for the environment variable
  tagTypes: [], // You can specify tag types if you use them for caching and invalidation
  endpoints: (builder) => ({}),
});
