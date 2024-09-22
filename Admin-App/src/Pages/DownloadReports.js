import React from "react";
import { useSelector } from "react-redux";
import { base_url } from "../utils/base_url";
import axios from "axios";

const DownloadReports = () => {
  const { user } = useSelector((state) => state.auth); // Get the user from the redux store

  const downloadReport = async (type) => {
    try {
      const token = user.token; // Get the token from the user's state
      const response = await axios.get(
        `${base_url}admin/reports/excel?type=${type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
          responseType: "blob", // Important for file download
        }
      );
      // Create a download link for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report_${type}.xlsx`); // File name
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  return (
    <div>
      <h2>Download Excel Reports</h2>
      <button onClick={() => downloadReport("donation")}>
        Download Donation Report
      </button>
      <button onClick={() => downloadReport("expense")}>
        Download Expense Report
      </button>
      <button onClick={() => downloadReport("volunteer")}>
        Download Volunteer Report
      </button>
      <button onClick={() => downloadReport("crisis")}>
        Download Crisis Report
      </button>
    </div>
  );
};

export default DownloadReports;
