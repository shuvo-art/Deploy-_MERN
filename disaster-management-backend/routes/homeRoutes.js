const express = require("express");
const router = express.Router();
const { getHomepageData } = require("../controllers/homeController");

// Homepage route for anyone (no authentication required)
router.get("/", getHomepageData);

module.exports = router;
