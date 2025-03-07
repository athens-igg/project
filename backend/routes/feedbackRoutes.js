const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createFeedback, getFeedbackForTrip, deleteFeedback } = require("../controllers/feedbackController");

const router = express.Router();

router.post("/", protect, createFeedback); // Submit feedback
router.get("/:tripId", getFeedbackForTrip); // Get all feedback for a trip
router.delete("/:id", protect, deleteFeedback); // Delete feedback

module.exports = router;
