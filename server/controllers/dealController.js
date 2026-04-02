const Deal = require('../models/Deal');
const Product = require('../models/Product');

const getDeals = async (req, res) => {
  try {
    const deals = await Deal.find({ isActive: true })
      .populate('productId')
      .sort({ createdAt: -1 });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deals', error });
  }
};

const getAllDeals = async (req, res) => {
  try {
    const deals = await Deal.find()
      .populate('productId')
      .sort({ createdAt: -1 });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deals', error });
  }
};

const getDealById = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id).populate('productId');
    if (deal) {
      res.json(deal);
    } else {
      res.status(404).json({ message: 'Deal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deal', error });
  }
};

const createDeal = async (req, res) => {
  try {
    const { productId, discountPercentage, discountPrice, isActive, endDate } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const deal = new Deal({
      productId,
      discountPercentage,
      discountPrice,
      isActive,
      endDate
    });

    const createdDeal = await deal.save();
    const populatedDeal = await createdDeal.populate('productId');
    res.status(201).json(populatedDeal);
  } catch (error) {
    res.status(500).json({ message: 'Error creating deal', error });
  }
};

const updateDeal = async (req, res) => {
  try {
    const { productId, discountPercentage, discountPrice, isActive, endDate } = req.body;
    const deal = await Deal.findById(req.params.id);

    if (deal) {
      if (productId) deal.productId = productId;
      if (discountPercentage !== undefined) deal.discountPercentage = discountPercentage;
      if (discountPrice !== undefined) deal.discountPrice = discountPrice;
      if (isActive !== undefined) deal.isActive = isActive;
      if (endDate !== undefined) deal.endDate = endDate;
      deal.updatedAt = Date.now();

      const updatedDeal = await deal.save();
      const populatedDeal = await updatedDeal.populate('productId');
      res.json(populatedDeal);
    } else {
      res.status(404).json({ message: 'Deal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating deal', error });
  }
};

const deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (deal) {
      await deal.deleteOne();
      res.json({ message: 'Deal removed' });
    } else {
      res.status(404).json({ message: 'Deal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting deal', error });
  }
};

module.exports = {
  getDeals,
  getAllDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal
};
