export const CATEGORIES = [
  { id: 'deals', name: 'Deals' },
  { id: 'speciality', name: 'Speciality' },
  { id: 'cookies', name: 'Cookies', parent: 'desserts' },
  { id: 'biscuits', name: 'Biscuits', parent: 'desserts' },
  { id: 'cupcakes', name: 'Cupcakes', parent: 'desserts' },
  { id: 'cakes', name: 'Cakes', parent: 'desserts' },
  { id: 'brownies', name: 'Brownies', parent: 'desserts' }
];

export const PRODUCTS = [
  {
    id: 1,
    name: "Premium Nan Khatai - Badam",
    price: 1400,
    category: "speciality",
    image: "/images/product 1.png",
    description: "Crunchiest Nan Khatai ever with loaded almonds and traditional taste.",
    rating: 4.8,
    isFeatured: true
  },
  {
    id: 2,
    name: "Classic Nan Khatai - Pista",
    price: 1300,
    category: "speciality",
    image: "/images/product 2.png",
    description: "Rich traditional Nan Khatai topped with premium pistachios.",
    rating: 4.7
  },
  {
    id: 3,
    name: "Assorted Biscuits Box",
    price: 500,
    category: "biscuits",
    image: "/images/product 3.png",
    description: "Handcrafted assortment of our best-selling bakery biscuits.",
    rating: 4.5
  },
  {
    id: 4,
    name: "Chocolate Party Cupcakes",
    price: 500,
    category: "cupcakes",
    image: "/images/product 4.png",
    description: "Pack of 6 delicious chocolate cupcakes with creamy frosting.",
    rating: 4.9
  },
  {
    id: 5,
    name: "Vanilla Donuts - QT 6",
    price: 600,
    category: "cupcakes",
    image: "/images/product 5.png",
    description: "Soft and fluffy donuts with rainbow sprinkles and vanilla glaze.",
    rating: 4.6
  },
  {
    id: 6,
    name: "Traditional Plain Khatai",
    price: 1200,
    category: "speciality",
    image: "/images/product 6.png",
    description: "The classic taste of home-baked plain Nan Khatai.",
    rating: 4.4
  },
  {
    id: 7,
    name: "Chocolate Chip Cookies",
    price: 450,
    category: "cookies",
    image: "/images/product 7.png",
    description: "Chunkier chocolate chips in every bite of our fresh baked cookies.",
    rating: 4.7
  },
  {
    id: 8,
    name: "Fruit Cake Loaf",
    price: 800,
    category: "cakes",
    image: "/images/product 8.png",
    description: "Moist fruit cake loaded with candied fruits and nuts.",
    rating: 4.5
  },
  {
    id: 9,
    name: "Fudge Brownies",
    price: 650,
    category: "brownies",
    image: "/images/product 9.png",
    description: "Rich, gooey Belgian chocolate brownies.",
    rating: 5.0
  },
  {
    id: 10,
    name: "Coconut Biscuits",
    price: 400,
    category: "biscuits",
    image: "/images/product 10.png",
    description: "Crispy biscuits with a roasted coconut flavor.",
    rating: 4.3
  }
];

export const HERO_SLIDES = [
  {
    image: "/images/menu.png",
    tagline: "The Art of Traditional Baking",
    title: "Premium Nan Khatai",
    cta: "Shop Speciality"
  },
  {
    image: "/images/advertisement card.png",
    tagline: "Sweeten Your Moments",
    title: "Delicious Desserts",
    cta: "Order Now"
  },
  {
    image: "/images/Packaging.png",
    tagline: "Perfect Gifts for Loved Ones",
    title: "Bakestro Gift Packs",
    cta: "View Collection"
  }
];
