import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import crisisService from "./crisisService";

// Thunk to create a new crisis
export const createCrisis = createAsyncThunk(
  "crisis/create-crisis",
  async (crisisData, thunkAPI) => {
    try {
      return await crisisService.createCrisis(crisisData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk to approve a crisis
export const approveCrisis = createAsyncThunk(
  "crisis/approve-crisis",
  async ({ id, token }, thunkAPI) => {
    try {
      return await crisisService.approveCrisis(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk to delete a crisis
export const deleteCrisis = createAsyncThunk(
  "crisis/delete-crisis",
  async ({ id, token }, thunkAPI) => {
    try {
      return await crisisService.deleteCrisis(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk to get all crises
export const getCrises = createAsyncThunk(
  "crisis/get-crises",
  async (_, thunkAPI) => {
    try {
      return await crisisService.getCrises();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  crises: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const crisisSlice = createSlice({
  name: "crisis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCrisis.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCrisis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCrisis = action.payload;
      })
      .addCase(createCrisis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getCrises.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCrises.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.crises = action.payload;
      })
      .addCase(getCrises.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(approveCrisis.fulfilled, (state, action) => {
        // Update the crisis status in the state after successful approval
        const updatedCrisis = action.payload;
        state.crises = state.crises.map((crisis) =>
          crisis._id === updatedCrisis._id ? updatedCrisis : crisis
        );
      })
      .addCase(deleteCrisis.fulfilled, (state, action) => {
        // Remove the deleted crisis from the state
        state.crises = state.crises.filter(
          (crisis) => crisis._id !== action.payload._id
        );
      })
      .addCase(deleteCrisis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // Store only the error message instead of the entire error object
        state.message = action.error.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default crisisSlice.reducer;
