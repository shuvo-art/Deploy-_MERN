const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Get all users (public access)
exports.getUser = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // If no users are found, return a 404 response
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Return the list of users
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, assignedTask } = req.body; // Only update these fields

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, phone, assignedTask },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a new token
    const token = jwt.sign(
      { id: updatedUser._id, email: updatedUser.email }, // Include necessary data in the token payload
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Set the token expiration time
    );

    // Send the updated user and token in the response
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      password: updatedUser.password, // Make sure to include password if needed
      role: updatedUser.role,
      __v: updatedUser.__v,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user task by Admin
exports.updateUserTask = async (req, res) => {
  try {
    const { assignedTask } = req.body; // Only update the assignedTask

    // Find and update the user with the provided ID in the request params
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { assignedTask },
      { new: true }
    );

    // If the user is not found, return 404
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the updated user details in the response
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      assignedTask: updatedUser.assignedTask,
    });
  } catch (err) {
    // Catch any server errors and return 500
    res.status(500).json({ message: err.message });
  }
};

// Admin user management (delete user)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // Admins can delete any user
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
