import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all donations
const getDonations = async () => {
  const response = await axios.get(`${base_url}donation/all`);
  return response.data;
};

// Create a new donation
const createDonation = async (donationData) => {
  const response = await axios.post(
    `${base_url}donation/add`,
    donationData,
    config
  );
  return response.data;
};

const donationService = {
  getDonations,
  createDonation,
};

export default donationService;
