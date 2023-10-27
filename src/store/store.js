import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import authSlice from "./slices/authSlice";
import expenseSlice from "./slices/expenseSlice";
import categorySlice from "./slices/categorySlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authSlice,
    expense: expenseSlice,
    categories: categorySlice,
  },
});
