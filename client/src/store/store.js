// store.js
import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./reducer"; // Adjust path as per your project structure
import api from "./apiSlice"; // Adjust path as per your project structure

const store = configureStore({
  reducer: {
    expense: expenseReducer,
    [api.reducerPath]: api.reducer,
    // Add other reducers if needed
  },
  // Optional: Add middleware specific to Redux Toolkit Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
