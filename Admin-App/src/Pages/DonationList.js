import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getDonations } from "../features/donation/donationSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Donor",
    dataIndex: "donor",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
];

const DonationList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDonations());
  }, [dispatch]);

  const { donations, isLoading } = useSelector((state) => state.donation);

  if (isLoading) {
    return <Spin size="large" />;
  }

  const dataSource =
    donations?.map((donation, index) => ({
      key: index + 1,
      donor: donation.donor,
      amount: donation.amount,
      date: new Date(donation.date).toLocaleDateString(),
    })) || [];

  return (
    <div>
      <h3 className="mb-4 title">Donation List</h3>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default DonationList;
