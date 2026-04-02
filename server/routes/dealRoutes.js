const express = require('express');
const router = express.Router();
const {
  getDeals,
  getAllDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal
} = require('../controllers/dealController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getDeals);
router.get('/:id', getDealById);

// Admin routes
router.get('/all', protect, admin, getAllDeals);
router.post('/', protect, admin, createDeal);
router.put('/:id', protect, admin, updateDeal);
router.delete('/:id', protect, admin, deleteDeal);

module.exports = router;
