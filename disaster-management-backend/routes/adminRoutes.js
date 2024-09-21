const express = require("express");
const router = express.Router();
const {
  manageVolunteers,
  addVolunteer,
  updateVolunteer,
  deleteVolunteer,
  manageCrises,
  addCrisis,
  updateCrisis,
  deleteCrisis,
  generateReport,
  generateExcelReport,
} = require("../controllers/adminController");
const { authenticate, authorize } = require("../middleware/auth");

// Volunteer routes
router.get("/volunteers", authenticate, authorize(["admin"]), manageVolunteers); // Get all volunteers
router.post("/volunteers", authenticate, authorize(["admin"]), addVolunteer); // Add new volunteer
router.put(
  "/volunteers/:id",
  authenticate,
  authorize(["admin"]),
  updateVolunteer
); // Update volunteer by ID
router.delete(
  "/volunteers/:id",
  authenticate,
  authorize(["admin"]),
  deleteVolunteer
); // Delete volunteer by ID

// Crisis routes
router.get("/crises", authenticate, authorize(["admin"]), manageCrises); // Get all crises
router.post("/crises", authenticate, authorize(["admin"]), addCrisis); // Add new crisis
router.put("/crises/:id", authenticate, authorize(["admin"]), updateCrisis); // Update crisis by ID
router.delete("/crises/:id", authenticate, authorize(["admin"]), deleteCrisis); // Delete crisis by ID

// Report generation routes
router.get("/reports", authenticate, authorize(["admin"]), generateReport); // Generate daily JSON reports (donations & expenses)
router.get(
  "/reports/excel",
  authenticate,
  authorize(["admin"]),
  generateExcelReport
); // Generate Excel report (type-based)
module.exports = router;
