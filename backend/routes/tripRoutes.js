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
} = require("../controllers/itineraryController");
const authMiddleware = require("../middleware/authMiddleware"); // Correct import

// @desc    Create a trip
// @route   POST /api/trips
// @access  Private
router.post("/", authMiddleware, createTrip);
router.get("/", authMiddleware, getTrips);
router.put("/:id", authMiddleware, updateTrip);
router.delete("/:id", authMiddleware, deleteTrip);

// @desc    Itinerary Generation
router.post("/generate-itinerary", authMiddleware, generateItinerary);
router.get("/user", authMiddleware, getUserItineraries);
router.get("/:id/itinerary", authMiddleware, getTripItinerary);
router.post("/:id/generate-itinerary", authMiddleware, generateItinerary);

// Additional CRUD operations with authMiddleware applied
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { destination, startDate, endDate, tripType, interests, itinerary } =
      req.body;
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

router.get("/", authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trips" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trip" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: "Failed to update trip" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete trip" });
  }
});

module.exports = router;
