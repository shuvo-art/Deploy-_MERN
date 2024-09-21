import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import donationService from "./donationService";

// Thunk to create a new donation
export const createDonation = createAsyncThunk(
  "donation/create-donation",
  async (donationData, thunkAPI) => {
    try {
      return await donationService.createDonation(donationData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk to get all donations
export const getDonations = createAsyncThunk(
  "donation/get-donations",
  async (_, thunkAPI) => {
    try {
      return await donationService.getDonations();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  donations: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const donationSlice = createSlice({
  name: "donation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDonation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDonation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdDonation = action.payload;
      })
      .addCase(createDonation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getDonations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDonations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.donations = action.payload;
      })
      .addCase(getDonations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default donationSlice.reducer;
