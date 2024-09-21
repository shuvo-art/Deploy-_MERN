import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import expenseService from "./expenseService";

// Thunk to create a new expense
export const createExpense = createAsyncThunk(
  "expense/create-expense",
  async (expenseData, thunkAPI) => {
    try {
      return await expenseService.createExpense(expenseData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk to get all expenses
export const getExpenses = createAsyncThunk(
  "expense/get-expenses",
  async (_, thunkAPI) => {
    try {
      return await expenseService.getExpenses();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  expenses: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdExpense = action.payload;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.expenses = action.payload;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default expenseSlice.reducer;
