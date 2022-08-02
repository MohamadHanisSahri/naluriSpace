import { configureStore } from "@reduxjs/toolkit";
import { naluriSpaceSlice } from "../services/naluriEndpoints";
import planetSliceReducer from "./planet-slice";
export const store = configureStore({
  reducer: {
    planet: planetSliceReducer,
    [naluriSpaceSlice.reducerPath]: naluriSpaceSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(naluriSpaceSlice.middleware),
});
