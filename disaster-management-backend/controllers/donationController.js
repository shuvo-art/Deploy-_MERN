const Donation = require("../models/Donation");
const Expense = require("../models/Expense");

// Add a new donation
exports.addDonation = async (req, res) => {
  const { amount, donor } = req.body;
  try {
    const donation = new Donation({ amount, donor });
    await donation.save();
    res.status(201).json({ message: "Donation added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get daily donations and expenses for the bar chart
exports.getDailyDonations = async (req, res) => {
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

    // Return the daily donations and expenses for the bar chart
    res.json({ donations, expenses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get total all-time donations
exports.getTotalDonations = async (req, res) => {
  try {
    const totalDonations = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    res.json({ totalAmount: totalDonations[0]?.totalAmount || 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// New controller to get all donations
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find(); // Fetch all donations
    res.status(200).json(donations); // Return the list of donations
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations", error });
  }
};
