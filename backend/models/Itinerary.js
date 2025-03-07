const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    days: {
        type: Object, // Stores the structured itinerary per day
        required: true,
      },
    },
    { timestamps: true }
  );

const Itinerary = mongoose.model("Itinerary", itinerarySchema);
module.exports = Itinerary;
