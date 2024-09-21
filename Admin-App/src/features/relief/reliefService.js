import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all relief items
const getReliefs = async () => {
  const response = await axios.get(`${base_url}relief/allrelief`, config);
  return response.data;
};

// Create a new relief item
const createRelief = async (reliefData) => {
  const response = await axios.post(
    `${base_url}relief/addrelief`,
    reliefData,
    config
  );
  return response.data;
};

const reliefService = {
  getReliefs,
  createRelief,
};

export default reliefService;
