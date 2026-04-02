const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  isFeatured: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
  pricingUnit: { type: String, enum: ['piece', 'kg', 'box', 'dozen'], default: 'piece' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
