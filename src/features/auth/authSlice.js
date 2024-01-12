import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  loggedInUser: null,
  emailSent: false,
  errors: null,
};

export const registerUserAsync = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        (state.status = "idle"), (state.errors = action.payload);
      });
  },
});

export const {} = authSlice.actions;

export const selectAuthStatus = (state) => state.auth.status;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectEmailSent = (state) => state.auth.emailSent;
export const selectErrors = (state) => state.auth.errors;

export default authSlice.reducer;
