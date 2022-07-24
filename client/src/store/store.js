import { configureStore } from "@reduxjs/toolkit";
import { naluriSpaceSlice } from "../services/naluriEndpoints";
export const store = configureStore({
  reducer: {
    [naluriSpaceSlice.reducerPath]: naluriSpaceSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(naluriSpaceSlice.middleware),
});
