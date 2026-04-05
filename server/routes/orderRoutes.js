const express = require('express');
const router = express.Router();
const { addOrderItems, getOrderById, getMyOrders, getOrders, updateOrderStatus, exportOrders } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', addOrderItems);
router.get('/', getOrders);
router.get('/myorders', getMyOrders);
router.get('/export', exportOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', updateOrderStatus);

module.exports = router;
