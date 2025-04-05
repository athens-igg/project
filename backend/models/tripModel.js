const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming you have a User model
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    interests: {
        type: [String], // Array of interests like ["Food", "Sightseeing"]
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Trip = mongoose.model("Trip", tripSchema);

module.exports = mongoose.model("Trip", tripSchema);