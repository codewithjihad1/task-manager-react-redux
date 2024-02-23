import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeProjects: [],
  search: "",
};

// create filter slice
const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export default filterSlice.reducer;
export const { updateFilter } = filterSlice.actions;
