import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkAuth,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  verifyOTP,
} from "./authApi";
import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  authUser: JSON.parse(localStorage.getItem("user")) || JSON.stringify({}),
  authChecked: false,
  resetToken: null,
  errors: null,
};

export const checkAuthAsync = createAsyncThunk("auth/checkAuth", async () => {
  try {
    const response = await checkAuth();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const registerUserAsync = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    try {
      const response = await registerUser(userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const verifyOTPasync = createAsyncThunk(
  "auth/verifyOTP",
  async (userData) => {
    try {
      const response = await verifyOTP(userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    try {
      const response = await loginUser(userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const forgotPasswordAsync = createAsyncThunk(
  "auth/forgotPassword",
  async (userData) => {
    try {
      const response = await forgotPassword(userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async (userData) => {
    try {
      const response = await resetPassword(userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const logoutUserAsync = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await logoutUser();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // toggleEmailSent: (state) => {
    //   state.emailSent = !emailSent;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.errors = null;
        state.authUser = action.payload;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        localStorage.removeItem("user");
        authUser = {};
        toast.error("login again");
      })
      .addCase(registerUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.errors = null;
        state.authUser = action.payload;
        toast.success("verification otp sent on email");
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = "idle";
        localStorage.removeItem("user");
        state.errors = action.error.message || "something went wrong";
        toast.error(state.errors);
      })
      .addCase(verifyOTPasync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyOTPasync.fulfilled, (state, action) => {
        state.status = "idle";
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.errors = null;
        state.authUser = action.payload;
        toast.success("user registered successfully");
      })
      .addCase(verifyOTPasync.rejected, (state, action) => {
        state.status = "idle";
        localStorage.removeItem("user");
        state.errors = action.error.message || "something went wrong";
        toast.error(state.errors);
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.errors = null;
        state.authUser = action.payload;
        toast.success("user logged in successfully");
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        localStorage.removeItem("user");
        state.errors = action.error.message || "something went wrong";
        toast.error(state.errors);
      })
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.errors = null;
        toast.success("reset-password link sent on mail!!!");
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.errors = action.error.message || "something went wrong";
        toast.error(state.errors);
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.errors = null;
        toast.success("user password changed successfully!!! ");
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.errors = action.error.message || "something went wrong";
        toast.error(state.errors);
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        localStorage.removeItem("user");
        state.authUser = {};
        state.errors = null;
        toast.success("user logged out successfully");
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.errors = action.error.message || "something went wrong";
        toast.error(state.errors);
      });
  },
});

// export const { toggleEmailSent } = authSlice.actions;

export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthUser = (state) => state.auth.authUser;
export const selectAuthChecked = (state) => state.auth.authChecked;
export const selectResetToken = (state) => state.auth.resetToken;
export const selectErrors = (state) => state.auth.errors;

export default authSlice.reducer;
