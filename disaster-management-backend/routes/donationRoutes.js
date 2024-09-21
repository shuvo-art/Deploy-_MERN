const express = require("express");
const router = express.Router();
const {
  addDonation,
  getDailyDonations,
  getTotalDonations,
  getAllDonations,
} = require("../controllers/donationController");

// POST /donation/add
router.post("/add", addDonation);

// GET /donation/daily
router.get("/daily", getDailyDonations);

// GET /donation/total
router.get("/total", getTotalDonations);

// GET /donation/all - Route to get all donations
router.get("/all", getAllDonations);

module.exports = router;
