import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses } from "../features/expense/expenseSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Details",
    dataIndex: "details",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
];

const ExpenseList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  const { expenses, isLoading } = useSelector((state) => state.expense);

  if (isLoading) {
    return <Spin size="large" />;
  }

  const dataSource =
    expenses?.map((expense, index) => ({
      key: index + 1,
      amount: expense.amount,
      details: expense.details,
      date: new Date(expense.date).toLocaleDateString(),
    })) || [];

  return (
    <div>
      <h3 className="mb-4 title">Expense List</h3>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default ExpenseList;
