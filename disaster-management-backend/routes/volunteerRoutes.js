const express = require("express");
const router = express.Router();
const {
  addVolunteer,
  getVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
} = require("../controllers/volunteerController");

// POST /volunteer/add
router.post("/add", addVolunteer);

// GET /volunteer
router.get("/", getVolunteers);

// GET /volunteer/:id
router.get("/:id", getVolunteerById);

// PUT /volunteer/update/:id
router.put("/update/:id", updateVolunteer);

// DELETE /volunteer/delete/:id
router.delete("/delete/:id", deleteVolunteer);

module.exports = router;
