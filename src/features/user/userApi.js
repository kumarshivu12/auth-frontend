import axios from "axios";

const URL = "http://localhost:8000/api/v1/user";

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${URL}/current-user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const updateAccount = async (userData) => {
  try {
    const response = await axios.post(`${URL}/update-account`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};
