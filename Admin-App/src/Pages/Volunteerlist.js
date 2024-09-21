import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getVolunteers } from "../features/volunteers/volunteerSlice";

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
];

const VolunteerList = () => {
  const dispatch = useDispatch();

  // Fetch volunteers on component mount
  useEffect(() => {
    dispatch(getVolunteers());
  }, [dispatch]);

  // Access volunteers and loading state from Redux
  const { volunteers, isLoading } = useSelector((state) => state.volunteers);

  // If loading, display a spinner
  if (isLoading) {
    return <Spin size="large" />;
  }

  // Prepare data for the table
  const dataSource =
    volunteers?.map((volunteer, index) => ({
      key: index + 1,
      name: volunteer.name,
      email: volunteer.email,
      phone: volunteer.phone,
    })) || [];

  return (
    <div>
      <h3 className="mb-4 title">Volunteer List</h3>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default VolunteerList;
