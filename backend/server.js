require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Handle form data

// Debug: Check if API Key is loaded
console.log(
  "API Key Loaded:",
  process.env.OPENTRIPMAP_API_KEY ? "✅ Yes" : "❌ No"
);

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to TravelWorld API!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Exit if DB connection fails
  });

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/destinations", require("./routes/destinationRoutes"));
app.use("/api/trips", require("./routes/tripRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/itineraries", require("./routes/itineraryRoutes"));
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// Health Check
app.get("/api/destinations", (req, res) => {
  res.json({ message: "Destinations API is working!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
