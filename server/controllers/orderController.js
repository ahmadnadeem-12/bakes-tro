const Order = require('../models/Order');
const { exportOrdersToExcel } = require('../utils/exportExcel');
const path = require('path');

const addOrderItems = async (req, res) => {
  try {
    const { items, shippingDetails, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      user: req.user?._id,
      items,
      shippingDetails,
      totalPrice,
    });

    const createdOrder = await order.save();

    // Auto-export to Excel
    try {
      await exportOrdersToExcel();
    } catch (e) {
      console.log('Excel export skipped');
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const exportOrders = async (req, res) => {
  try {
    const filePath = await exportOrdersToExcel();
    res.download(filePath, 'bakestro_orders.xlsx');
  } catch (error) {
    res.status(500).json({ message: 'Export failed', error: error.message });
  }
};

module.exports = { 
  addOrderItems, 
  getOrderById, 
  getMyOrders, 
  getOrders, 
  updateOrderStatus,
  exportOrders
};
