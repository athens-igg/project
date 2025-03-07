import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data?.message || error.message);
    throw error;
  }
};
