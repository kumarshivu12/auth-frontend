import axios from "axios";

const URL = "http://localhost:8000/auth";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${URL}/register-user`, userData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const verifyOTP = async (otp) => {
  try {
    const response = await axios.post(`${URL}/verify-otp`, otp);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
