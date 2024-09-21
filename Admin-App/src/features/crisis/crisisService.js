import axios from "axios";
import { base_url } from "../../utils/base_url";

// Get all crises
const getCrises = async () => {
  const response = await axios.get(`${base_url}crisis/`);
  return response.data;
};

// Create a new crisis
const createCrisis = async (crisisData, token) => {
  // Accept token as a parameter
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in Authorization header
    },
  };
  const response = await axios.post(
    `${base_url}crisis/add`,
    crisisData,
    config
  );
  return response.data;
};

// Approve a crisis
const approveCrisis = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in Authorization header
    },
  };
  const response = await axios.put(
    `${base_url}crisis/approve/${id}`,
    {},
    config
  );
  return response.data;
};

// Delete a crisis
const deleteCrisis = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in Authorization header
    },
  };
  const response = await axios.delete(`${base_url}crisis/delete/${id}`, config);
  return response.data;
};

const crisisService = {
  getCrises,
  createCrisis,
  approveCrisis,
  deleteCrisis,
};

export default crisisService;
