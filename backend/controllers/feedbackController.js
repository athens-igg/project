const Feedback = require("../models/feedbackModel");

// ✅ Submit feedback for website (No tripId)
const createFeedback = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        if (!rating || !comment) {
            return res.status(400).json({ message: "Rating and comment are required." });
        }

        const feedback = await Feedback.create({
            user: req.user._id,
            name: req.user.name,  // ✅ Store username for display
            rating,
            comment,
        });

        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: "Failed to submit feedback" });
    }
};

// ✅ Fetch all feedback (Website Reviews)
const getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ createdAt: -1 }); // Latest first
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch feedback" });
    }
};

// ✅ Delete feedback (Only the user who created it)
const deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        
        if (!feedback) return res.status(404).json({ message: "Feedback not found" });

        // ✅ Ensure the logged-in user is the one who created the feedback
        if (feedback.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this feedback" });
        }

        await feedback.deleteOne();
        res.json({ message: "Feedback deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete feedback" });
    }
};

// ✅ Ensure `deleteFeedback` is exported properly
module.exports = { createFeedback, getAllFeedback, deleteFeedback }; 