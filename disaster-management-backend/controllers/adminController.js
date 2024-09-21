const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const { Volunteer, Crisis, Donation, Expense } = require("../models");

// Manage volunteers (GET all volunteers)
exports.manageVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new volunteer
exports.addVolunteer = async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res.status(201).json(volunteer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update volunteer by ID
exports.updateVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!volunteer)
      return res.status(404).json({ message: "Volunteer not found" });
    res.json(volunteer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete volunteer by ID
exports.deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
    if (!volunteer)
      return res.status(404).json({ message: "Volunteer not found" });
    res.json({ message: "Volunteer deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Manage crises (GET all crises)
exports.manageCrises = async (req, res) => {
  try {
    const crises = await Crisis.find();
    res.json(crises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new crisis
exports.addCrisis = async (req, res) => {
  try {
    const crisis = new Crisis(req.body);
    await crisis.save();
    res.status(201).json(crisis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update crisis by ID
exports.updateCrisis = async (req, res) => {
  try {
    const crisis = await Crisis.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!crisis) return res.status(404).json({ message: "Crisis not found" });
    res.json(crisis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete crisis by ID
exports.deleteCrisis = async (req, res) => {
  try {
    const crisis = await Crisis.findByIdAndDelete(req.params.id);
    if (!crisis) return res.status(404).json({ message: "Crisis not found" });
    res.json({ message: "Crisis deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

    const fileName = path.join(
      reportDir,
      `report_${new Date().toISOString()}.${type}.xlsx`
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
