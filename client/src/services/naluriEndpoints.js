import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const naluriSpaceSlice = createApi({
  reducerPath: "naluriSpaceAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3106/api" }),
  tagTypes: ["MasterTable", "MasterTable_AWS"],
  endpoints: (builder) => ({
    // ---------------------------for pgsql
    getPlanets_PGSQL: builder.query({
      query: () => "/select-planets-pg",
      providesTags: ["MasterTable_AWS"],
    }),
    deletePlanet_PGSQL: builder.mutation({
      query: (planet_id) => ({
        url: `/delete-planet-pg/${planet_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MasterTable_AWS"],
    }),
    postPlanet_PGSQL: builder.mutation({
      query: (body) => ({
        url: "/insert-planet-pg",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MasterTable_AWS"],
    }),
    putPlanet_PGSQL: builder.mutation({
      query: (body) => ({
        url: "/update-planet-pg",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["MasterTable_AWS"],
    }),
    // ---------------------------for mysql
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
  // ---------------------------for pgsql
  useGetPlanets_PGSQLQuery,
  usePostPlanet_PGSQLMutation,
  usePutPlanet_PGSQLMutation,
  useDeletePlanet_PGSQLMutation,
  // ---------------------------for mysql
  useGetAllPlanetQuery,
  usePostPlanetMutation,
  usePutPlanetMutation,
  useDeletePlanetMutation,
} = naluriSpaceSlice;
