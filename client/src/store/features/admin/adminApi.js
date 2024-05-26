import { apiSlice } from "../api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeChoiceList: builder.query({
      query: () => "/admin/choices",
    }),
    getEmployeeAll: builder.query({
      query: () => "/admin/allEmployeeList",
      providesTags: ["getEmployeeAll"],
    }),
    getAllMenu: builder.query({
      query: () => "/employee/menu",
      providesTags: ["getAllMenu"],
    }),
    getAllMenuByDate: builder.query({
      query: (date) => `/employee/menu?date=${date}`,
      providesTags: ["getAllMenuByDate"],
    }),
    addFoodItem: builder.mutation({
      query: (data) => ({
        url: "/admin/menu",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getAllMenu", "getAllMenuByDate"],
    }),
    deleteMenu: builder.mutation({
      query: (id) => ({
        url: `/admin/menu/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["getAllMenu", "getAllMenuByDate"],
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/auth/user/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["getEmployeeAll"],
    }),
  }),
});

export const {
  useGetEmployeeChoiceListQuery,
  useGetEmployeeAllQuery,
  useGetAllMenuQuery,
  useLazyGetAllMenuByDateQuery,
  useAddFoodItemMutation,
  useDeleteMenuMutation,
  useDeleteEmployeeMutation,
} = adminApi;
