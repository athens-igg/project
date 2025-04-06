const express = require("express");
const router = express.Router();
const Itinerary = require("../models/Itinerary");
const { protect } = require("../middleware/authMiddleware");

// ✅ Route to save an itinerary
/*router.post("/", protect, async (req, res) => {
  try {
    const { trip, destination, startDate, endDate, days } = req.body;

    const itinerary = new Itinerary({
      user: req.user.id,
      trip,
      destination,
      startDate,
      endDate,
      days,
    });

    const savedItinerary = await itinerary.save();
    res.status(201).json(savedItinerary);
  } catch (error) {
    console.error("❌ Error saving itinerary:", error);
    res.status(500).json({ message: "Failed to save itinerary" });
  }
});*/

// ✅ Route to save an itinerary
router.post("/", protect, async (req, res) => {
  try {
    const { trip, destination, startDate, endDate, days } = req.body;

    // 🔎 Check for existing itinerary with same user, destination and date range
    const existing = await Itinerary.findOne({
      user: req.user.id,
      destination,
      startDate,
      endDate,
    });

    if (existing) {
      return res.status(409).json({ message: "Itinerary already exists." });
    }

    const itinerary = new Itinerary({
      user: req.user.id,
      trip,
      destination,
      startDate,
      endDate,
      days,
    });

    const savedItinerary = await itinerary.save();
    res.status(201).json(savedItinerary);
  } catch (error) {
    console.error("❌ Error saving itinerary:", error);
    res.status(500).json({ message: "Failed to save itinerary" });
  }
});

// ✅ Route to get logged-in user's saved itineraries
router.get("/mine", protect, async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(itineraries);
  } catch (error) {
    console.error("❌ Error fetching itineraries:", error);
    res.status(500).json({ message: "Failed to fetch itineraries" });
  }
});

module.exports = router;
