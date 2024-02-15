import axios from "axios";

const URL = "http://localhost:8000/api/v1/auth";

export const checkAuth = async () => {
  try {
    const response = await axios.post(
      `${URL}/check-auth`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${URL}/register-user`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const verifyOTP = async (userData) => {
  try {
    const response = await axios.post(`${URL}/verify-otp`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${URL}/login-user`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(`${URL}/forgot-password`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const resetPassword = async (userData) => {
  try {
    const response = await axios.post(`${URL}/reset-password`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${URL}/logout-user`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};
