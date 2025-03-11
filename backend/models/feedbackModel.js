const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true }, // ✅ Store username
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
