const express = require("express");
const router = express.Router();
const {
  addCrisis,
  getCrises,
  approveCrisis,
  deleteCrisis,
} = require("../controllers/crisisController");
const { authenticate, authorize } = require("../middleware/auth"); // Add authentication & authorization middlewares

// POST /crisis/add (Anonymous can add crises)
router.post("/add", addCrisis);

// GET /crisis (Anyone can view crises)
router.get("/", getCrises);

// PUT /crisis/approve/:id (Only admin can approve a crisis)
router.put("/approve/:id", authenticate, authorize(["admin"]), approveCrisis);

router.delete("/delete/:id", authenticate, authorize(["admin"]), deleteCrisis);

module.exports = router;
