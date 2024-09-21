const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  updateUserTask,
  deleteUser,
} = require("../controllers/userController");

const { registerUser, loginUser } = require("../controllers/authController");
const { authenticate, authorize } = require("../middleware/auth");

// User authentication routes
router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser); // Login a user

// Profile route for logged-in users
router.get("/account", authenticate, getUser); // Get logged-in user profile
router.put("/account", authenticate, updateUser); // Update logged-in user profile

// Admin routes for managing users
router.get("/", getUser); // Get all users (for admins)
router.get("/:id", authenticate, getUser); // Get a user by ID (for admins)
router.put("/:id", authenticate, updateUser); // Update user by ID (for admins)
router.put(
  "/updatetask/:id",
  authenticate,
  authorize(["admin"]),
  updateUserTask
);
router.delete("/delete/:id", authenticate, authorize(["admin"]), deleteUser); // Delete a user by ID (for admins)

module.exports = router;
