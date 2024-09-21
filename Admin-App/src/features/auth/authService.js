import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Register user
const register = async (userData) => {
  const response = await axios.post(`${base_url}users/register`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${base_url}users/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Update user profile
// Update user profile
const updateUserProfile = async (userData) => {
  const response = await axios.put(
    `${base_url}users/${userData.id}`,
    userData,
    config
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data)); // Update the localStorage with updated data
  }

  return response.data;
};

const authService = {
  login,
  register,
  updateUserProfile,
};

export default authService;
