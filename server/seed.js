const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  {
    name: "Premium Nan Khatai - Badam",
    price: 1400,
    category: "speciality",
    image: "/images/product 1.png",
    description: "Crunchiest Nan Khatai ever with loaded almonds and traditional taste.",
    rating: 4.8,
    isFeatured: true
  },
  {
    name: "Classic Nan Khatai - Pista",
    price: 1300,
    category: "speciality",
    image: "/images/product 2.png",
    description: "Rich traditional Nan Khatai topped with premium pistachios.",
    rating: 4.7
  },
  {
    name: "Assorted Biscuits Box",
    price: 500,
    category: "biscuits",
    image: "/images/product 3.png",
    description: "Handcrafted assortment of our best-selling bakery biscuits.",
    rating: 4.5
  },
  {
    name: "Chocolate Party Cupcakes",
    price: 500,
    category: "cupcakes",
    image: "/images/product 4.png",
    description: "Pack of 6 delicious chocolate cupcakes with creamy frosting.",
    rating: 4.9
  },
  {
    name: "Vanilla Donuts - QT 6",
    price: 600,
    category: "cupcakes",
    image: "/images/product 5.png",
    description: "Soft and fluffy donuts with rainbow sprinkles and vanilla glaze.",
    rating: 4.6
  },
  {
    name: "Traditional Plain Khatai",
    price: 1200,
    category: "speciality",
    image: "/images/product 6.png",
    description: "The classic taste of home-baked plain Nan Khatai.",
    rating: 4.4
  },
  {
    name: "Chocolate Chip Cookies",
    price: 450,
    category: "cookies",
    image: "/images/product 7.png",
    description: "Chunkier chocolate chips in every bite of our fresh baked cookies.",
    rating: 4.7
  },
  {
    name: "Fruit Cake Loaf",
    price: 800,
    category: "cakes",
    image: "/images/product 8.png",
    description: "Moist fruit cake loaded with candied fruits and nuts.",
    rating: 4.5
  },
  {
    name: "Fudge Brownies",
    price: 650,
    category: "brownies",
    image: "/images/product 9.png",
    description: "Rich, gooey Belgian chocolate brownies.",
    rating: 5.0
  },
  {
    name: "Coconut Biscuits",
    price: 400,
    category: "biscuits",
    image: "/images/product 10.png",
    description: "Crispy biscuits with a roasted coconut flavor.",
    rating: 4.3
  }
];

const seedDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bakestro';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    // Seed products
    await Product.insertMany(products);
    console.log('📦 Products seeded successfully');

    // Seed admin user
    const admin = new User({
       name: 'Admin Bakestro',
       email: 'admin@bakestro.com',
       phone: '0329-6032936',
       password: 'admin123', // Will be hashed by pre-save middle
       role: 'admin'
    });
    await admin.save();
    console.log('👤 Admin user seeded successfully');

    mongoose.connection.close();
    console.log('🔒 Seeding complete, connection closed');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  }
};

seedDB();
