import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getReliefs } from "../features/relief/reliefSlice";

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
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
];

const ReliefList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReliefs());
  }, [dispatch]);

  const { reliefs, isLoading } = useSelector((state) => state.relief);

  if (isLoading) {
    return <Spin size="large" />;
  }

  const dataSource =
    reliefs?.map((relief, index) => ({
      key: index + 1,
      name: relief.name,
      quantity: relief.quantity,
      date: new Date(relief.date).toLocaleDateString(),
    })) || [];

  return (
    <div>
      <h3 className="mb-4 title">Relief List</h3>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default ReliefList;
