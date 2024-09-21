import React, { useEffect } from "react";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../features/home/homeSlice";

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
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Assigned Task",
    dataIndex: "assignedTask",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    totalFunds,
    dailyDonations,
    dailyExpenses,
    recentCrises,
    availableUsers,
  } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  // Calculate total expenses and available stock first
  const totalExpenses = dailyExpenses.reduce(
    (sum, expense) => sum + expense.totalAmount,
    0
  );
  const availableStock = totalFunds - totalExpenses;

  // Prepare data for chart after calculations
  const donationData = dailyDonations
    .slice(-3)
    .map((d) => ({ type: d._id, value: d.totalAmount }));
  const expenseData = dailyExpenses
    .slice(-3)
    .map((e) => ({ type: e._id, value: e.totalAmount }));

  //Total Funds, Total Expenses, Available Stock, Donation Data, Expense Data
  const combinedData = [
    { type: "Funds", value: totalFunds },
    { type: "Expenses", value: totalExpenses },
    { type: "Available Stock", value: availableStock },
    ...donationData,
    ...expenseData,
  ];

  // Chart configuration
  const config = {
    data: combinedData,
    xField: "type",
    yField: "value",
    color: ({ type }) => {
      if (type === "Funds") return "#4CAF50"; // Green for Funds
      if (type === "Expenses") return "#F44336"; // Red for Expenses
      return "#ffd333"; // Default color for others
    },
    label: {
      position: "top",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: { alias: "Category" },
      value: { alias: "Amount" },
    },
  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Funds</p>
            <h4 className="mb-0 sub-title">${totalFunds}</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Expenses</p>
            <h4 className="mb-0 sub-title">${totalExpenses}</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Available Stock</p>
            <h4 className="mb-0 sub-title">${availableStock}</h4>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Income Statistics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Recent Crises</h3>
        <Table
          dataSource={recentCrises}
          columns={[
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
          ]}
        />
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Available Users</h3>
        <Table
          columns={columns}
          dataSource={availableUsers.map((user, index) => ({
            key: index + 1,
            ...user,
          }))}
        />
      </div>
    </div>
  );
};

export default Dashboard;
