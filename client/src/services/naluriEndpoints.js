import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const naluriSpaceSlice = createApi({
  reducerPath: "naluriSpaceAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3106/api" }),
  tagTypes: ["MasterTable"],
  endpoints: (builder) => ({
    getAllPlanet: builder.query({
      query: () => "/select-planets",
      providesTags: ["MasterTable"],
    }),
    postPlanet: builder.mutation({
      query: (body) => ({
        url: "/insert-incr-digit-planet",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MasterTable"],
    }),
    putPlanet: builder.mutation({
      query: (body) => ({
        url: "/update-planet",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["MasterTable"],
    }),
    deletePlanet: builder.mutation({
      query: (id) => ({
        url: `/delete-planet/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MasterTable"],
    }),
  }),
});

export const {
  useGetAllPlanetQuery,
  usePostPlanetMutation,
  usePutPlanetMutation,
  useDeletePlanetMutation,
} = naluriSpaceSlice;
