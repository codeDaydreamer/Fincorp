import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = `http://localhost:8080`;

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api", // Name your slice
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    // Get categories endpoint
    getCategories: builder.query({
      query: () => `/api/categories`,
      providesTags: [`categories`], // Caches data with 'categories' tag
    }),
    // Get labels endpoint
    getLabels: builder.query({
      query: () => `/api/labels`,
      providesTags: [`labels`], // Caches data with 'labels' tag
    }),
    // Add new transaction endpoint
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        url: "/api/transactions",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: [`transactions`], // Invalidates cache with 'transactions' tag
    }),
    // Delete transaction endpoint
    deleteTransaction: builder.mutation({
      query: (recordId) => ({
        url: `/api/transactions/${recordId}`, // Adjust URL if needed based on your API
        method: "DELETE",
      }),
      invalidatesTags: [`transactions`], // Invalidates cache with 'transactions' tag
    }),
  }),
});

export const { useGetCategoriesQuery, useGetLabelsQuery, useAddTransactionMutation ,useDeleteTransactionMutation} = api;

export default api;
