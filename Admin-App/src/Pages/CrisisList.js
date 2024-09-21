import React, { useEffect, useState } from "react";
import { Table, Spin, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getCrises,
  approveCrisis,
  deleteCrisis,
} from "../features/crisis/crisisSlice"; // Import additional thunks
import { BiCheckCircle } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Severity",
    dataIndex: "severity",
  },
  {
    title: "Location",
    dataIndex: "location",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const CrisisList = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCrisisId, setSelectedCrisisId] = useState(null);

  // Fetch crises on component mount
  useEffect(() => {
    dispatch(getCrises());
  }, [dispatch]);

  // Access crises and loading state from Redux
  const { crises, isLoading } = useSelector((state) => state.crisis);
  const { user: authUser } = useSelector((state) => state.auth); // Access current user (admin)

  // If loading, display a spinner
  if (isLoading) {
    return <Spin size="large" />;
  }

  const handleApproveCrisis = (crisisId) => {
    const token = authUser?.token; // Retrieve token from the auth state
    dispatch(approveCrisis({ id: crisisId, token }));
  };

  const handleDeleteCrisis = (crisisId) => {
    setSelectedCrisisId(crisisId);
    setIsModalVisible(true);
  };

  const confirmDelete = () => {
    const token = authUser?.token; // Retrieve token from the auth state
    dispatch(deleteCrisis({ id: selectedCrisisId, token }))
      .unwrap() // Ensure the action resolves before refetching
      .then(() => {
        dispatch(getCrises()); // Refetch the crises after deleting
      })
      .catch((error) => {
        console.error("Failed to delete crisis:", error);
      });
    setIsModalVisible(false);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Prepare data for the table
  const dataSource =
    crises?.map((crisis, index) => ({
      key: index + 1,
      title: crisis.title,
      description: crisis.description,
      severity: crisis.severity,
      location: crisis.location,
      status: crisis.status,
      action:
        authUser?.role === "admin" ? ( // Ensure only admins can see action buttons
          <>
            {crisis.status === "pending" && (
              <Button
                type="link"
                icon={<BiCheckCircle />}
                onClick={() => handleApproveCrisis(crisis._id)}
              >
                Approve
              </Button>
            )}
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => handleDeleteCrisis(crisis._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ) : null,
    })) || [];

  return (
    <div>
      <h3 className="mb-4 title">Crisis List</h3>
      <Table columns={columns} dataSource={dataSource} />

      <Modal
        title="Confirm Delete"
        open={isModalVisible} // Change this from 'visible' to 'open'
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" danger onClick={confirmDelete}>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this crisis?</p>
      </Modal>
    </div>
  );
};

export default CrisisList;
