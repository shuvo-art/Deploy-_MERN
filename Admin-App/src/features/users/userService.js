import axios from "axios";
import { base_url } from "../../utils/base_url";

const getUsers = async () => {
  const response = await axios.get(`${base_url}users`);
  return response.data;
};

// Adding the updateUserTask function to include the token
const updateUserTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in Authorization header
    },
  };
  const response = await axios.put(
    `${base_url}users/updatetask/${taskData.id}`,
    { assignedTask: taskData.assignedTask },
    config
  );
  return response.data;
};

const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in Authorization header
    },
  };
  const response = await axios.delete(`${base_url}users/delete/${id}`, config);
  return response.data;
};

const userService = {
  getUsers,
  updateUserTask, // Make sure to export the function
  deleteUser,
};

export default userService;
