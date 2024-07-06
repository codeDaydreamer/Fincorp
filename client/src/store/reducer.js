// reducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  transactions: []
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    getTransactions: (state) => {
      // Placeholder for logic to handle getting transactions
    },
    // Add more reducers as needed
  }
});

export const { getTransactions } = expenseSlice.actions;
export default expenseSlice.reducer;
