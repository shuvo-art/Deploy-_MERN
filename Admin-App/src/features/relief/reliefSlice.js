import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import reliefService from "./reliefService";

// Thunk to create a new relief item
export const createRelief = createAsyncThunk(
  "relief/create-relief",
  async (reliefData, thunkAPI) => {
    try {
      return await reliefService.createRelief(reliefData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk to get all relief items
export const getReliefs = createAsyncThunk(
  "relief/get-reliefs",
  async (_, thunkAPI) => {
    try {
      return await reliefService.getReliefs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  reliefs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const reliefSlice = createSlice({
  name: "relief",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRelief.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRelief.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdRelief = action.payload;
      })
      .addCase(createRelief.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(getReliefs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReliefs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.reliefs = action.payload;
      })
      .addCase(getReliefs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default reliefSlice.reducer;
