const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageURL: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Gallery", gallerySchema);
