const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const { Volunteer, Crisis, Donation, Expense } = require("../models");

// Generate daily reports (donations and expenses)
exports.generateReport = async (req, res) => {
  try {
    const donations = await Donation.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    const expenses = await Expense.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    res.json({ donations, expenses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.generateExcelReport = async (req, res) => {
  const { type } = req.query; // Query parameter to specify report type

  try {
    let data, headers;
    const reportDir = path.join(__dirname, "../reports"); // Path to the reports directory

    // Ensure the directory exists
    if (!fs.existsSync(reportDir)) {
      console.log(`Directory not found, creating: ${reportDir}`);
      fs.mkdirSync(reportDir, { recursive: true });
    } else {
      console.log(`Directory exists: ${reportDir}`);
    }

    // Ensure filename is safe for all filesystems (replace colons in date)
    const fileName = path.join(
      reportDir,
      `report_${new Date().toISOString().replace(/:/g, "-")}.${type}.xlsx`
    );
    console.log(`Generating Excel file at: ${fileName}`);

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    if (type === "donation") {
      data = await Donation.find(); // Fetch donation data
      headers = ["Date", "Amount", "Donor"]; // Example header

      // Add headers to the worksheet
      worksheet.columns = headers.map((header) => ({
        header,
        key: header.toLowerCase().replace(" ", "_"),
      }));

      // Add data rows
      data.forEach((item) => {
        worksheet.addRow({
          date: item.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
          amount: item.amount,
          donor: item.donor,
        });
      });
    } else if (type === "expense") {
      data = await Expense.find(); // Fetch expense data
      headers = ["Date", "Amount", "Details"]; // Example header

      worksheet.columns = headers.map((header) => ({
        header,
        key: header.toLowerCase().replace(" ", "_"),
      }));
      data.forEach((item) => {
        worksheet.addRow({
          date: item.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
          amount: item.amount,
          details: item.details,
        });
      });
    } else if (type === "volunteer") {
      data = await Volunteer.find(); // Fetch volunteer data
      headers = ["Name", "Age", "Mobile", "Assigned Task"]; // Example header

      worksheet.columns = headers.map((header) => ({
        header,
        key: header.toLowerCase().replace(" ", "_"),
      }));
      data.forEach((item) => {
        worksheet.addRow({
          name: item.name,
          age: item.age,
          mobile: item.mobile,
          assigned_task: item.assignedTask,
        });
      });
    } else if (type === "crisis") {
      data = await Crisis.find(); // Fetch crisis data
      headers = ["Title", "Description", "Severity", "Location"]; // Example header

      worksheet.columns = headers.map((header) => ({
        header,
        key: header.toLowerCase().replace(" ", "_"),
      }));
      data.forEach((item) => {
        worksheet.addRow({
          title: item.title,
          description: item.description,
          severity: item.severity,
          location: item.location,
        });
      });
    } else {
      return res.status(400).json({ message: "Invalid report type" });
    }

    // Save the Excel file
    await workbook.xlsx.writeFile(fileName);
    console.log(`Excel report generated at: ${fileName}`);

    // Send the file for download
    res.download(fileName, () => {
      fs.unlinkSync(fileName); // Clean up the file after download
    });
  } catch (err) {
    console.error("Error generating Excel report:", err);
    res.status(500).json({ message: err.message });
  }
};
