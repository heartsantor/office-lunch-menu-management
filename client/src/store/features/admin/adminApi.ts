import { apiSlice } from "../api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeChoiceList: builder.query({
      query: () => "/admin/choices",
    }),
    getAllMenu: builder.query({
      query: () => "/employee/menu",
    }),
    getAllMenuByDate: builder.query({
      query: (date) => `/employee/menu?date=${date}`,
    }),
    addFoodItem: builder.mutation({
      query: (data) => ({
        url: "/admin/menu",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetEmployeeChoiceListQuery,
  useGetAllMenuQuery,
  useLazyGetAllMenuByDateQuery,
  useAddFoodItemMutation,
} = adminApi;
