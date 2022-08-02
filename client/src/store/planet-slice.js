import { createSlice } from "@reduxjs/toolkit";

const planetSlice = createSlice({
  name: "planet",
  initialState: {
    diameter: "",
    radius: "",
  },
  reducers: {
    calculateDiameterHandler(state, action) {
      if (action.payload === "") {
        state.diameter = "";
      } else {
        state.diameter = +(action.payload * 2);
      }
    },

    diameterHandler(state, action) {
      state.diameter = action.payload;
    },

    calculateRadiusHandler(state, action) {
      if (action.payload === "") {
        state.radius = "";
      } else {
        state.radius = +(action.payload / 2);
      }
    },
  },
});

export const planetActions = planetSlice.actions;
export default planetSlice.reducer;
