import { apiSlice } from "../api/apiSlice";

export const employeeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeTodayMenu: builder.query({
      query: (id) => `/employee/menu/today/${id}`,
    }),
    addEmployeeChoice: builder.mutation({
      query: (data) => ({
        url: "/employee/choice",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetEmployeeTodayMenuQuery, useAddEmployeeChoiceMutation } =
  employeeApi;
