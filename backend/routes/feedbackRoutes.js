const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createFeedback, getAllFeedback,  deleteFeedback } = require("../controllers/feedbackController"); // 🔥 Ensure deleteFeedback is imported

const router = express.Router();

router.post("/", protect, createFeedback); // ✅ Submit feedback
router.get("/", getAllFeedback); // ✅ Get all feedback
//router.get("/:tripId", getFeedbackForTrip); // ✅ Get feedback for a specific trip
router.delete("/:id", protect, deleteFeedback); // ✅ Delete feedback (Only owner)

module.exports = router;
