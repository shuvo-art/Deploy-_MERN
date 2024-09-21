import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import homeService from "./homeService";

export const getDashboardData = createAsyncThunk(
  "home/get-dashboard-data",
  async (_, thunkAPI) => {
    try {
      const response = await homeService.getDashboardData();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  totalFunds: 0,
  dailyDonations: [],
  dailyExpenses: [],
  recentCrises: [],
  availableUsers: [],
  isLoading: false,
  isError: false,
  message: "",
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalFunds = action.payload.totalFunds;
        state.dailyDonations = action.payload.dailyDonations;
        state.dailyExpenses = action.payload.dailyExpenses;
        state.recentCrises = action.payload.recentCrises;
        state.availableUsers = action.payload.availableUsers;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export default homeSlice.reducer;
