const Feedback = require("../models/feedbackModel");

// Create feedback
const createFeedback = async (req, res) => {
    try {
        const { trip, rating, comment } = req.body;
        const feedback = await Feedback.create({
            trip,
            user: req.user._id, // User must be logged in
            rating,
            comment,
        });
        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: "Failed to submit feedback" });
    }
};

// Get feedback for a trip
const getFeedbackForTrip = async (req, res) => {
    try {
        const feedback = await Feedback.find({ trip: req.params.tripId }).populate("user", "name");
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch feedback" });
    }
};

// Delete feedback (Only by the user who created it)
const deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) return res.status(404).json({ message: "Feedback not found" });

        if (feedback.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this feedback" });
        }

        await feedback.deleteOne();
        res.json({ message: "Feedback deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete feedback" });
    }
};

module.exports = { createFeedback, getFeedbackForTrip, deleteFeedback };
