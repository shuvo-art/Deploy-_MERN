const Crisis = require("../models/Crisis");

// Add a new crisis (Anonymous users can add; status is set to "pending")
exports.addCrisis = async (req, res) => {
  const { title, description, severity, location, image } = req.body;
  try {
    const crisis = new Crisis({
      title,
      description,
      severity,
      location,
      image,
      status: "pending", // Automatically set to "pending" for admin approval
    });
    await crisis.save();
    res
      .status(201)
      .json({ message: "Crisis added successfully, pending approval" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all crises with optional filters (severity, status)
exports.getCrises = async (req, res) => {
  const { severity, status } = req.query;
  let filter = {};

  if (severity) filter.severity = severity;
  if (status) filter.status = status;

  try {
    const crises = await Crisis.find(filter);
    res.json(crises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update crisis status to "approved" by Admin
exports.approveCrisis = async (req, res) => {
  try {
    // Find the crisis by ID
    const crisis = await Crisis.findById(req.params.id);

    // If the crisis is not found, return 404
    if (!crisis) {
      return res.status(404).json({ message: "Crisis not found" });
    }

    // Update the status to "approved"
    crisis.status = "approved";
    await crisis.save(); // Save the updated status

    // Return the updated crisis details in the response
    res.json({
      _id: crisis._id,
      title: crisis.title,
      description: crisis.description,
      severity: crisis.severity,
      location: crisis.location,
      status: crisis.status, // Status should now be "approved"
      createdAt: crisis.createdAt,
      updatedAt: crisis.updatedAt,
    });
  } catch (err) {
    // Catch any server errors and return 500
    res.status(500).json({ message: err.message });
  }
};

// Controller to delete a crisis by ID (Admin-only)
exports.deleteCrisis = async (req, res) => {
  try {
    // Find the crisis by ID and delete it
    const crisis = await Crisis.findByIdAndDelete(req.params.id);

    // If the crisis is not found, return 404
    if (!crisis) {
      return res.status(404).json({ message: "Crisis not found" });
    }

    // Return success response
    res.json({ message: "Crisis deleted successfully" });
  } catch (err) {
    // Catch any server errors and return 500
    res.status(500).json({ message: err.message });
  }
};
