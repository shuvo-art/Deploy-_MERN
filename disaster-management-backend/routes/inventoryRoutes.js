const express = require("express");
const router = express.Router();
const {
  getInventoryItems,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} = require("../controllers/inventoryController");
const { authenticate, authorize } = require("../middleware/auth");

// Volunteers and admins can view the inventory
router.get(
  "/",
  authenticate,
  authorize(["volunteer", "admin"]),
  getInventoryItems
);

// Only admins can add inventory items
router.post("/", authenticate, authorize(["admin"]), addInventoryItem);

// Both volunteers and admins can update inventory items
router.put(
  "/:id",
  authenticate,
  authorize(["volunteer", "admin"]),
  updateInventoryItem
);

// Only admins can delete inventory items
router.delete("/:id", authenticate, authorize(["admin"]), deleteInventoryItem);

module.exports = router;
