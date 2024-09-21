import React, { useEffect, useState } from "react";
import { Table, Spin, Modal, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  updateUserTask,
  deleteUser,
} from "../features/users/userSlice";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "phone",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const UserList = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [task, setTask] = useState("");

  // Fetch users on component mount
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Access users and loading state from Redux
  const { users, isLoading } = useSelector((state) => state.users);
  const { user: authUser } = useSelector((state) => state.auth); // Access current user (admin)

  // If loading, display a spinner
  if (isLoading) {
    return <Spin size="large" />;
  }

  const handleEditProfile = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleAssignTask = () => {
    const token = authUser?.token; // Retrieve token from the auth state
    dispatch(updateUserTask({ id: selectedUserId, assignedTask: task, token })); // Pass the token when dispatching
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTask("");
  };

  const handleDeleteUser = (userId) => {
    const token = authUser?.token; // Retrieve token from the auth state
    dispatch(deleteUser({ id: userId, token }))
      .unwrap() // Ensure the action resolves before refetching
      .then(() => {
        dispatch(getUsers()); // Refetch the users after deleting
      })
      .catch((error) => {
        console.error("Failed to delete user:", error);
      });
  };

  // Prepare data for the table
  const dataSource =
    users?.map((user, index) => ({
      key: index + 1,
      name: user.name,
      email: user.email,
      phone: user.phone,
      action:
        authUser?.role === "admin" ? ( // Ensure only admins can see action buttons
          <>
            <Button
              type="link"
              icon={<BiEdit />}
              onClick={() => handleEditProfile(user._id)}
            >
              Assign Task
            </Button>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => handleDeleteUser(user._id)} // Call delete user
            >
              <AiFillDelete />
            </button>
          </>
        ) : null,
    })) || [];

  return (
    <div>
      <h3 className="mb-4 title">Volunteer List</h3>
      <Table columns={columns} dataSource={dataSource} />

      <Modal
        title="Assign Task"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAssignTask}>
            Assign Task
          </Button>,
        ]}
      >
        <Input
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default UserList;
