const express = require("express");
const router = express.Router();
const {
  generateReport,
  generateExcelReport,
} = require("../controllers/adminController");
const { authenticate, authorize } = require("../middleware/auth");

// Report generation routes
router.get("/reports", authenticate, authorize(["admin"]), generateReport); // Generate daily JSON reports (donations & expenses)
router.get(
  "/reports/excel",
  authenticate,
  authorize(["admin"]),
  generateExcelReport
); // Generate Excel report (type-based)
module.exports = router;
