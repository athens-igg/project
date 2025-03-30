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
const { getTripItinerary } = require("../controllers/tripController"); //   Import function

// @desc    Create a trip
// @route   POST /api/trips
// @access  Private

//   CRUD operations for trips
router.post("/", protect, createTrip);  //   Create trip
router.get("/", protect, getTrips);     //   Get all trips
router.put("/:id", protect, updateTrip); //   Update trip
router.delete("/:id", protect, deleteTrip); //   Delete trip

//   Itinerary Routes
router.get("/user", protect, getUserItineraries); // Get all user itineraries
router.get("/:id/itinerary", protect, getTripItinerary); // Get itinerary for a specific trip
router.post("/:id/generate-itinerary", protect, generateItinerary); //   Generate itinerary for a trip


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