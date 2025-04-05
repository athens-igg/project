const express = require("express");
const { protect } = require("../middleware/authMiddleware"); // Unified import

const {
  createFeedback,
  getAllFeedback,
  deleteFeedback,
} = require("../controllers/feedbackController");

const router = express.Router();

// Routes
router.post("/", protect, createFeedback); // Submit feedback (protected)
router.get("/", getAllFeedback); // Get all feedback (public)
router.delete("/:id", protect, deleteFeedback); // Delete feedback (protected, owner only)

module.exports = router;
