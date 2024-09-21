const express = require("express");
const router = express.Router();

const { addRelief, getAllRelief } = require("../controllers/reliefController");
const { authenticate } = require("../middleware/auth");

// Route to add a new relief item (only authenticated users can add relief items)
router.post("/addrelief", authenticate, addRelief);

// Route to get all relief items (only authenticated users can view relief items)
router.get("/allrelief", authenticate, getAllRelief);

module.exports = router;
