const Gallery = require("../models/galleryModel");
const fs = require("fs");
const path = require("path");

//   Upload Photo (Only logged-in users)
const uploadPhoto = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No image uploaded" });

        const { location, date } = req.body;
        if (!location || !date) return res.status(400).json({ message: "Location and date are required" });

        const newPhoto = await Gallery.create({
            user: req.user._id, //   Associate with logged-in user
            imageURL: `/uploads/${req.file.filename}`, //   Store image path
            location,
            date,
        });

        res.status(201).json(newPhoto);
    } catch (error) {
        res.status(500).json({ message: "Failed to upload photo" });
    }
};

//   Get all photos
const getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find().populate("user", "name"); //   Show uploader's name
        res.json(gallery);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch gallery" });
    }
};

//   Delete Photo (Only uploader can delete)
const deletePhoto = async (req, res) => {
    try {
        const photo = await Gallery.findById(req.params.id);
        if (!photo) return res.status(404).json({ message: "Photo not found" });

        if (photo.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this photo" });
        }

        //   FIXED FILE PATH FOR DELETION
        const filePath = path.join(__dirname, "../uploads", path.basename(photo.imageURL));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await photo.deleteOne();
        res.json({ message: "Photo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete photo" });
    }
};

module.exports = { uploadPhoto, getGallery, deletePhoto };
