const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Feedback = require('../models/feedbackModel'); // if you have it
const Gallery = require('../models/galleryModel'); // if you have it
const { protect } = require('../middleware/authMiddleware');
const { verifyAdmin } = require('../middleware/admin');
router.get('/test', (req, res) => {
    res.send('Admin route is working');
  });
  
// Get all users
router.get('/users', protect, verifyAdmin, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Delete a user
router.delete('/users/:id',protect,  verifyAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Get feedback
router.get('/feedbacks', protect, verifyAdmin, async (req, res) => {
  const feedbacks = await Feedback.find({});
  res.json(feedbacks);
});

// Delete a feedback
router.delete('/feedbacks/:id',protect,  verifyAdmin, async (req, res) => {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted' });
  });

// Get all gallery images
router.get('/gallery', protect, verifyAdmin, async (req, res) => {
    try {
      const images = await Gallery.find({}).populate('user', 'name');
      res.json(images);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      res.status(500).json({ message: "Server error while fetching gallery images." });
    }
  });
  
  
  // Approve a gallery image
  router.put('/gallery/approve/:id',protect,  verifyAdmin, async (req, res) => {
    const imageId = req.params.id;
    await Gallery.findByIdAndUpdate(imageId, { approved: true });
    res.json({ message: 'Image approved' });
  });
  
  // Delete a gallery image
  router.delete('/gallery/:id', protect, verifyAdmin, async (req, res) => {
    const imageId = req.params.id;
    await Gallery.findByIdAndDelete(imageId);
    res.json({ message: 'Image deleted' });
  });

module.exports = router;
