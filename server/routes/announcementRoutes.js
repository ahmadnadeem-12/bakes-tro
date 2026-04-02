const express = require('express');
const router = express.Router();
const {
  getAnnouncements,
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} = require('../controllers/announcementController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAnnouncements);
router.get('/:id', getAnnouncementById);

// Admin routes
router.get('/all', protect, admin, getAllAnnouncements);
router.post('/', protect, admin, createAnnouncement);
router.put('/:id', protect, admin, updateAnnouncement);
router.delete('/:id', protect, admin, deleteAnnouncement);

module.exports = router;
