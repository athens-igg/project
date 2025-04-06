const express = require("express");
const router = express.Router();
const Trip = require("../models/tripModel");

const {
  createTrip,
  getTrips,
  updateTrip,
  deleteTrip,
  getTripItinerary,
} = require("../controllers/tripController");

const {
  generateItinerary,
  getUserItineraries,
  createItineraryFromTrip,
} = require("../controllers/itineraryController");

const { protect } = require("../middleware/authMiddleware");

// Trip CRUD routes
router.post("/", protect, createTrip);
router.get("/", protect, getTrips);

// Itinerary-related routes
router.get("/user", protect, getUserItineraries);

router.post("/:id/generate-itinerary", protect, generateItinerary);

// Extended itinerary generation
router.post("/:id/itinerary/generate", protect, createItineraryFromTrip);
router.get("/:id/itinerary", protect, getTripItinerary);
router.get("/:id/itinerary/generate", protect, createItineraryFromTrip);

// Optional: legacy fallback for any future trip-itinerary mapping
router.post("/trips/:tripId/itinerary", protect, createItineraryFromTrip);

router.get("/:id", protect, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trip" });
  }
});

router.put("/:id", protect, updateTrip);
router.delete("/:id", protect, deleteTrip);

module.exports = router;
