import axios from "axios";
import { base_url } from "../../utils/base_url";

const getVolunteers = async () => {
  const response = await axios.get(`${base_url}volunteer`);
  return response.data;
};

const volunteerService = {
  getVolunteers,
};

export default volunteerService;
