const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const donationRoutes = require("./routes/donationRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const crisisRoutes = require("./routes/crisisRoutes");
const userRoutes = require("./routes/userRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const homeRoutes = require("./routes/homeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const reliefRoutes = require("./routes/reliefRoutes");

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(
  cors({
    origin: "https://deploy-mern-frontend-rouge.vercel.app", // Allow requests from frontend port
  })
);
app.use(express.json());

// Routes
app.use("/", homeRoutes);
app.use("/admin", adminRoutes);
app.use("/crisis", crisisRoutes);
app.use("/users", userRoutes);

app.use("/donation", donationRoutes);
app.use("/volunteer", volunteerRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/expenses", expenseRoutes);
app.use("/relief", reliefRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
