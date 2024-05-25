import { apiSlice } from "../api/apiSlice";

export const employeeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeTodayMenu: builder.query({
      query: (id) => `/employee/menu/today/${id}`,
      providesTags: ["EmployeeTodayMenu"],
    }),
    addEmployeeChoice: builder.mutation({
      query: (data) => ({
        url: "/employee/choice",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EmployeeTodayMenu"],
    }),
  }),
});

export const { useGetEmployeeTodayMenuQuery, useAddEmployeeChoiceMutation } =
  employeeApi;
