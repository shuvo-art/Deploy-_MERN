const Inventory = require("../models/inventoryModel");

// Get all inventory items
exports.getInventoryItems = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new inventory item
exports.addInventoryItem = async (req, res) => {
  try {
    const { name, type, quantity } = req.body;

    // Ensure that the item type is valid
    if (!["relief", "expense"].includes(type)) {
      return res.status(400).json({ message: "Invalid inventory type" });
    }

    const newItem = new Inventory({
      name,
      type,
      quantity,
      createdBy: req.user._id, // Attach the user who created the item
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update inventory item by ID
exports.updateInventoryItem = async (req, res) => {
  try {
    const { name, type, quantity } = req.body;

    // Ensure that the item type is valid
    if (type && !["relief", "expense"].includes(type)) {
      return res.status(400).json({ message: "Invalid inventory type" });
    }

    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      { name, type, quantity },
      {
        new: true,
      }
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete inventory item by ID
exports.deleteInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
