import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategories: (state, actions) => {
      state.data = actions.payload;
    },
    addToCategories: (state, actions) => {
      state.data.push(actions.payload);
    },
  },
});

export const { addCategories, addToCategories } = categorySlice.actions;

export default categorySlice.reducer;
