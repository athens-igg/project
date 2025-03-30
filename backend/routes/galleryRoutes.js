const express = require("express");
const { getGallery, uploadPhoto, deletePhoto } = require("../controllers/galleryController"); //   Fixed import
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

//   Ensure /uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

//   Set up storage engine
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

//   File filter for images only
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only images are allowed."), false);
    }
};

//   Multer upload middleware
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

//   GET Route to Fetch All Gallery Photos
router.get("/", getGallery); //   FIXED FUNCTION NAME

//   POST Route to Upload a Photo (Only Logged-in Users)
router.post("/upload", protect, upload.single("image"), uploadPhoto);

//   DELETE Route to Delete a Photo (Only Owner)
router.delete("/:id", protect, deletePhoto);

module.exports = router;
