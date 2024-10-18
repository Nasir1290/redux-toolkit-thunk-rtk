// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1" }),
//   endpoints:(buidler) => ({
//     getTodos:buidler.query({
//       query:() => ({
//         method:"GET",
//         url:"/todo"
//       })
//     })
//   })
// });

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // Define the base API
// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1" }),
//   endpoints: (builder) => ({
//     getTodos: builder.query({
//       query: () => ({
//         url: "/todo",
//         method: "GET",
//       }),
//     }),
//   }),
// });

// export const { useGetTodosQuery } = baseApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1" }),
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();
        if (priority) {
          params.append("priority", priority);
        }
        return {
          url: `/todo`,
          // url: `/todo?priority=${priority}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["todo"],
    }),
    addTodos: builder.mutation({
      query: (data) => ({
        url: "/todo",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const { useGetTodosQuery, useAddTodosMutation } = baseApi;
