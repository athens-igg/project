const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageURL: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Gallery", gallerySchema);
