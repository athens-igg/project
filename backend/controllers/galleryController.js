const Gallery = require("../models/galleryModel");

// Upload photo
const uploadPhoto = async (req, res) => {
    try {
        const { trip } = req.body;
        if (!req.file) return res.status(400).json({ message: "No image uploaded" });

        const newPhoto = await Gallery.create({
            trip,
            user: req.user._id,
            imageURL: `/uploads/${req.file.filename}`, // Image path
        });

        res.status(201).json(newPhoto);
    } catch (error) {
        res.status(500).json({ message: "Failed to upload photo" });
    }
};

// Get photos for a trip
const getGalleryForTrip = async (req, res) => {
    try {
        const gallery = await Gallery.find({ trip: req.params.tripId });
        res.json(gallery);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch gallery" });
    }
};

// Delete photo (Only by the user who uploaded it)
const deletePhoto = async (req, res) => {
    try {
        const photo = await Gallery.findById(req.params.id);
        if (!photo) return res.status(404).json({ message: "Photo not found" });

        if (photo.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this photo" });
        }

        await photo.deleteOne();
        res.json({ message: "Photo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete photo" });
    }
};

module.exports = { uploadPhoto, getGalleryForTrip, deletePhoto };
