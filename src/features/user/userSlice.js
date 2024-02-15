import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, updateAccount } from "./userApi";

const initialState = {
  status: "idle",
  userInfo: JSON.stringify({}),
  errors: null,
};

export const getCurrentUserAsync = createAsyncThunk(
  "user/currentUser",
  async () => {
    try {
      const response = await getCurrentUser();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateAccountAsync = createAsyncThunk(
  "user/updateAccount",
  async () => {
    try {
      const response = await updateAccount();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserAsync.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getCurrentUserAsync.fulfilled, (state, action) => {
      state.status = "pending";
      state.errors = null;
      state.userInfo = action.payload;
    });
    builder.addCase(getCurrentUserAsync.rejected, (state, action) => {
      state.status = "pending";
      state.errors = action.error.message || "something went wrong";
    });
    builder.addCase(updateAccountAsync.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(updateAccountAsync.fulfilled, (state, action) => {
      state.status = "pending";
      state.errors = null;
      state.userInfo = action.payload;
    });
    builder.addCase(updateAccountAsync.rejected, (state, action) => {
      state.status = "pending";
      state.errors = action.error.message || "something went wrong";
    });
  },
});

// export const {} = userSlice.actions;

export const selectUserStatus = (state) => state.user.status;
export const selectErrors = (state) => state.user.errors;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
