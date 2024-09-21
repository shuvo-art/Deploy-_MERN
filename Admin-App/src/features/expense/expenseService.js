import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all expenses
const getExpenses = async () => {
  const response = await axios.get(`${base_url}expenses/getallexp`, config);
  return response.data;
};

// Create a new expense
const createExpense = async (expenseData) => {
  const response = await axios.post(
    `${base_url}expenses/addexp`,
    expenseData,
    config
  );
  return response.data;
};

const expenseService = {
  getExpenses,
  createExpense,
};

export default expenseService;
