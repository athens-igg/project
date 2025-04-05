const express = require("express");
const authMiddleware = require("../middleware/authMiddleware"); // Correct import
const {
  createFeedback,
  getAllFeedback,
  deleteFeedback,
} = require("../controllers/feedbackController"); // Ensure deleteFeedback is exported

const router = express.Router();

// Routes
router.post("/", authMiddleware, createFeedback); // ✅ Submit feedback
router.get("/", getAllFeedback); // ✅ Get all feedback
// router.get("/:tripId", getFeedbackForTrip); // ✅ Get feedback for a specific trip (if implemented)
router.delete("/:id", authMiddleware, deleteFeedback); // ✅ Delete feedback (Only owner)

module.exports = router;
