const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Ensure JSON parsing middleware is used
app.use(express.urlencoded({ extended: true })); // Handle form data

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Debugging: Check if API Key is loaded
console.log("API Key Loaded:", process.env.OPENTRIPMAP_API_KEY ? "  Yes" : "❌ No");

// Simple Test Route
app.get("/", (req, res) => {
  res.send("Welcome to TravelWorld API!");
});

// Connect to MongoDB with better error handling & debugging
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("  MongoDB Connected Successfully!"))
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Stop the server if DB connection fails
  });

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const destinationRoutes = require("./routes/destinationRoutes");
app.use("/api/destinations", destinationRoutes);

const tripRoutes = require("./routes/tripRoutes");
app.use("/api/trips", tripRoutes);

const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api/feedback", feedbackRoutes);

const galleryRoutes = require("./routes/galleryRoutes");
app.use("/api/gallery", galleryRoutes);
app.use("/uploads", express.static("uploads")); // Serve uploaded images

const adminRoutes = require("./routes/admin");
app.use('/api/admin', adminRoutes);

app.get("/api/destinations", (req, res) => {
  res.json({ message: "Destinations API is working!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});