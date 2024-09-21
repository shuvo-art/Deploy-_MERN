const Donation = require("../models/Donation");
const Expense = require("../models/Expense");
const Crisis = require("../models/Crisis");
const User = require("../models/User");

// Function to fetch homepage data (fund, recent crises, available volunteers)
exports.getHomepageData = async (req, res) => {
  try {
    // Get total donated funds
    const totalFunds = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Get daily donations and expenses for the bar chart
    const dailyDonations = await Donation.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const dailyExpenses = await Expense.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Get recent crises without limit
    const recentCrises = await Crisis.find().sort({ createdAt: -1 });

    // Get available volunteers without limit
    const availableUsers = await User.find();

    res.json({
      totalFunds: totalFunds[0]?.totalAmount || 0,
      dailyDonations,
      dailyExpenses,
      recentCrises,
      availableUsers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
