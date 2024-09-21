import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import volunteerService from "./volunteerService";

const initialState = {
  volunteers: [], // Ensure `volunteers` is initialized as an empty array
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getVolunteers = createAsyncThunk(
  "volunteer/get-volunteers",
  async (_, thunkAPI) => {
    try {
      return await volunteerService.getVolunteers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const volunteerSlice = createSlice({
  name: "volunteers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVolunteers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVolunteers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.volunteers = action.payload; // Ensure volunteers is correctly populated
      })
      .addCase(getVolunteers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      });
  },
});

export default volunteerSlice.reducer;
