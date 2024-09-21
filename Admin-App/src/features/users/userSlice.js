import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  users: [], // Now referring to users instead of volunteers
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getUsers = createAsyncThunk(
  "user/get-users", // Updated to "user"
  async (_, thunkAPI) => {
    try {
      return await userService.getUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async thunk for updating user task
export const updateUserTask = createAsyncThunk(
  "user/update-task",
  async ({ id, assignedTask, token }, thunkAPI) => {
    try {
      return await userService.updateUserTask({ id, assignedTask }, token); // Pass token to service
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete-user",
  async ({ id, token }, thunkAPI) => {
    try {
      return await userService.deleteUser(id, token); // Pass token to service
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "users", // Updated to "users"
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.users = action.payload; // Updated to refer to users
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(updateUserTask.fulfilled, (state, action) => {
        // Update the user task in the state after a successful update
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message || "Failed to delete user";
      });
  },
});

export default userSlice.reducer;
