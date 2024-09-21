const Volunteer = require("../models/Volunteer");

// Add a new volunteer
exports.addVolunteer = async (req, res) => {
  const { name, age, mobile, assignedTask } = req.body;
  try {
    const volunteer = new Volunteer({ name, age, mobile, assignedTask });
    await volunteer.save();
    res.status(201).json({ message: "Volunteer added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all volunteers
exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single volunteer by ID
exports.getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer)
      return res.status(404).json({ message: "Volunteer not found" });
    res.json(volunteer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a volunteer's details
exports.updateVolunteer = async (req, res) => {
  const { name, age, mobile, assignedTask } = req.body;
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer)
      return res.status(404).json({ message: "Volunteer not found" });

    // Update fields
    if (name) volunteer.name = name;
    if (age) volunteer.age = age;
    if (mobile) volunteer.mobile = mobile;
    if (assignedTask) volunteer.assignedTask = assignedTask;

    await volunteer.save();
    res.json({ message: "Volunteer updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a volunteer
exports.deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer)
      return res.status(404).json({ message: "Volunteer not found" });

    await volunteer.remove();
    res.json({ message: "Volunteer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
