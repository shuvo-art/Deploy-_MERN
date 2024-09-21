const express = require("express");
const router = express.Router();

const {
  addExpense,
  getAllExpenses,
} = require("../controllers/expenseController");
const { authenticate } = require("../middleware/auth");
// Route to add a new expense
router.post("/addexp", authenticate, addExpense);

// Route to get all expenses
router.get("/getallexp", authenticate, getAllExpenses);

module.exports = router;
