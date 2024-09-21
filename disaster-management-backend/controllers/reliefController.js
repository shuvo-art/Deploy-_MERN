const Relief = require("../models/Relief"); // Assuming the Relief model is in the 'models' folder

// Add a relief item
const addRelief = async (req, res) => {
  const { name, quantity, date } = req.body;

  // Validate input
  if (!name || !quantity) {
    return res.status(400).json({ message: "Name and quantity are required." });
  }

  try {
    // Create a new relief item
    const newRelief = new Relief({
      name,
      quantity,
      date: date || Date.now(), // If date is provided, use it; otherwise, use the current date
    });

    // Save the relief item to the database
    const savedRelief = await newRelief.save();
    res.status(201).json(savedRelief); // Return the saved relief item
  } catch (error) {
    res.status(500).json({ message: "Error adding relief item", error });
  }
};

// Get all relief items
const getAllRelief = async (req, res) => {
  try {
    const reliefItems = await Relief.find(); // Fetch all relief items from the database
    res.status(200).json(reliefItems); // Return the list of relief items
  } catch (error) {
    res.status(500).json({ message: "Error retrieving relief items", error });
  }
};

module.exports = {
  addRelief,
  getAllRelief,
};
