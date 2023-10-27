import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    count: 0,
    total_pages: 0,
    current_page: 0,
    next: null,
    previous: null,
    results: [],
  },
  dashboard: {
    total_expenses: 0,
    total_amount: 0,
    total_expenses_month: 0,
    total_amount_month: 0,
    total_expenses_by_category: [],
  },
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpenses: (state, actions) => {
      state.data = actions.payload.data;
    },
    updateDashboardData: (state, actions) => {
      state.dashboard = actions.payload.dashboard;
    },
  },
});

export const { addExpenses, updateDashboardData } = expenseSlice.actions;

export default expenseSlice.reducer;
