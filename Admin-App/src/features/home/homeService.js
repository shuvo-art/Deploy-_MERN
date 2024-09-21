import axios from "axios";
import { base_url } from "../../utils/base_url";

// Get dashboard data
const getDashboardData = async () => {
  const response = await axios.get(`${base_url}`);
  return response.data;
};

const homeService = {
  getDashboardData,
};

export default homeService;
