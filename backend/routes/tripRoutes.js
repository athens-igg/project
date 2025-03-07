// tripRoutes.js (Express Routes)
const express = require("express");
const router = express.Router();
const Trip = require("../models/tripModel");

const { createTrip } = require("../controllers/tripController"); 
const { protect } = require("../middleware/authMiddleware");
const { getTrips } = require("../controllers/tripController");
const { updateTrip } = require("../controllers/tripController");
const { deleteTrip } = require("../controllers/tripController");
const { generateItinerary } = require("../controllers/itineraryController");
const { getUserItineraries } = require("../controllers/itineraryController");
const { getTripItinerary } = require("../controllers/tripController"); // ✅ Import function

// @desc    Create a trip
// @route   POST /api/trips
// @access  Private

// ✅ CRUD operations for trips
router.post("/", protect, createTrip);
router.get("/", protect, getTrips);
router.put("/:id", protect, updateTrip);
router.delete("/:id", protect, deleteTrip);

// ✅ Itinerary Generation
router.post("/generate-itinerary", protect, generateItinerary);
router.get("/user", protect, getUserItineraries);
router.get("/:id/itinerary", protect, getTripItinerary);
router.post("/:id/generate-itinerary", protect, generateItinerary);

router.post("/", protect, async (req, res) => {
  try {
    const { destination, startDate, endDate, tripType, interests, itinerary } = req.body;
    const trip = new Trip({
      user: req.user._id,
      destination,
      startDate,
      endDate,
      tripType,
      interests,
      itinerary,
    });
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Failed to create trip" });
  }
});

// @desc    Get all trips for a user
// @route   GET /api/trips
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trips" });
  }
});

// @desc    Get a specific trip
// @route   GET /api/trips/:id
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trip" });
  }
});

// @desc    Update a trip
// @route   PUT /api/trips/:id
// @access  Private
router.put("/:id", protect, async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: "Failed to update trip" });
  }
});

// @desc    Delete a trip
// @route   DELETE /api/trips/:id
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete trip" });
  }
});

module.exports = router;