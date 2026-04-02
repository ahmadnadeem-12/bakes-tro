# Bakestro - Modern Bakery E-Commerce Website

A beautifully redesigned bakery website featuring a modern homepage, comprehensive admin dashboard, and flexible product management system.

## Features

### Customer-Facing Features
- **Modern Homepage** with announcement bar, hero carousel, and product showcase
- **Dynamic Deals Section** displaying discounted products with attractive badges
- **Why Choose Us** feature cards highlighting bakery benefits
- **Customer Testimonials** carousel with star ratings
- **Newsletter Signup** for email subscriptions
- **Responsive Design** optimized for all devices
- **Product Catalog** with flexible pricing units (piece, kg, box, dozen)

### Admin Features
- **Product Management** - Create, read, update, and delete products
- **Pricing Units** - Configure different pricing types per product
- **Deals Management** - Create percentage-based discounts with auto-calculation
- **Deals Dashboard** - Manage active deals with expiration dates
- **Order Management** - Track and manage customer orders
- **Customer Management** - View and manage customer profiles
- **Analytics Overview** - Dashboard with key metrics

## Project Structure

```
bakestro/
├── client/                    # React Frontend (Vite)
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── AnnouncementBar/
│   │   │   ├── DealsSection/
│   │   │   ├── WhyChooseUs/
│   │   │   ├── Testimonials/
│   │   │   ├── Newsletter/
│   │   │   └── ... (existing components)
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Products.jsx
│   │   │   │   └── Deals.jsx
│   │   │   └── ... (existing pages)
│   │   ├── services/
│   │   │   └── api.js       # API service layer
│   │   ├── styles/
│   │   └── index.css        # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Node.js/Express Backend
│   ├── models/
│   │   ├── Product.js        # (Updated with pricingUnit)
│   │   ├── Deal.js           # (New)
│   │   ├── Announcement.js   # (New)
│   │   ├── User.js
│   │   └── Order.js
│   ├── controllers/
│   │   ├── productController.js    # (Updated)
│   │   ├── dealController.js       # (New)
│   │   ├── announcementController.js  # (New)
│   │   └── ... (existing controllers)
│   ├── routes/
│   │   ├── productRoutes.js        # (Updated)
│   │   ├── dealRoutes.js           # (New)
│   │   ├── announcementRoutes.js   # (New)
│   │   └── ... (existing routes)
│   ├── middleware/
│   ├── server.js            # (Updated with new routes)
│   ├── package.json
│   └── .env.example
│
├── API_DOCUMENTATION.md      # Detailed API reference
├── IMPLEMENTATION_GUIDE.md   # Setup and usage guide
├── BUILD_SUMMARY.md          # Project completion summary
└── README.md                 # This file
```

## Quick Start

### Prerequisites
- Node.js v14+
- MongoDB
- npm or yarn

### Installation

#### Backend Setup
```bash
# Install dependencies
cd server
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and other config

# Start server
npm run dev  # or npm start
```

#### Frontend Setup
```bash
# Install dependencies
cd client
npm install

# Start development server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Usage Guide

### For Customers
1. Browse the homepage to see featured products
2. Check the "Hot Deals" section for discounts
3. Click on products for details
4. Add items to cart and proceed to checkout
5. Subscribe to newsletter for exclusive offers

### For Admins
1. Navigate to `/admin` for the dashboard
2. Go to **Products** (`/admin/products`) to manage products
   - Click "Add Product" to create new items
   - Select pricing unit (piece, kg, box, dozen)
   - Edit or delete existing products
3. Go to **Deals** (`/admin/deals`) to manage discounts
   - Click "Create Deal" to add a discount
   - Select product and enter discount percentage
   - System auto-calculates discounted price
   - Set optional expiration date

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Deals
- `GET /api/deals` - Get active deals
- `POST /api/deals` - Create deal (admin)
- `PUT /api/deals/:id` - Update deal (admin)
- `DELETE /api/deals/:id` - Delete deal (admin)

### Announcements
- `GET /api/announcements` - Get active announcements
- `POST /api/announcements` - Create announcement (admin)
- `PUT /api/announcements/:id` - Update announcement (admin)
- `DELETE /api/announcements/:id` - Delete announcement (admin)

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API details.

## Configuration

### Environment Variables

**Server (.env)**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bakestro
JWT_SECRET=your_secure_secret_key
NODE_ENV=development
```

**Client (vite.config.js)**
```
VITE_API_URL=http://localhost:5000/api
```

## Technology Stack

### Frontend
- React 18 with Vite
- Tailwind CSS
- React Router
- Swiper (carousels)
- Framer Motion (animations)
- Axios (HTTP client)

### Backend
- Node.js/Express
- MongoDB/Mongoose
- JWT Authentication
- Bcrypt (password hashing)

## Key Features Explained

### Pricing Units
Products support flexible pricing:
- **Piece** - Individual items (e.g., 1 cupcake)
- **KG** - Weight-based (e.g., 1 kg of cookies)
- **Box** - Package deals (e.g., 1 box of 6 cupcakes)
- **Dozen** - 12-piece sets

### Deals System
- Create percentage-based discounts
- Automatic price calculation
- Optional expiration dates
- Easy enable/disable toggle
- Real-time display on homepage

### Announcement Bar
- Rotating messages every 5 seconds
- Configurable content via admin
- Dismissible by users
- Fully responsive

## Performance

- Optimized images with lazy loading
- Efficient database queries with indexing
- Responsive design for all devices
- Smooth animations with Framer Motion
- CSS-in-JS for dynamic styling

## Security

- JWT-based authentication
- Role-based access control (admin)
- Input validation on client and server
- Secure password hashing with bcrypt
- CORS protection
- Environment variables for sensitive data

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Troubleshooting

### API Connection Issues
1. Ensure backend is running (`npm run dev` in server directory)
2. Check MongoDB is running
3. Verify VITE_API_URL in frontend config
4. Check browser console for CORS errors

### Database Issues
1. Verify MongoDB connection string in .env
2. Ensure MongoDB service is running
3. Check database name is correct
4. Verify network access if using MongoDB Atlas

### Build Issues
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear Vite cache: `rm -rf .vite`
3. Check Node version: `node --version`

For more detailed troubleshooting, see [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md).

## Documentation

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Setup and usage guide
- **[BUILD_SUMMARY.md](./BUILD_SUMMARY.md)** - Project completion details

## Contributing

1. Create a feature branch: `git checkout -b feature/new-feature`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Future Enhancements

- [ ] Admin Settings Page
- [ ] Analytics Dashboard
- [ ] Inventory Management
- [ ] Email Notifications
- [ ] Payment Integration (Stripe/PayPal)
- [ ] Order Tracking
- [ ] Customer Reviews
- [ ] Wishlist Feature
- [ ] Advanced Search
- [ ] Multi-language Support

## License

MIT License - feel free to use this project for commercial purposes.

## Support

For questions or issues:
1. Check the documentation files
2. Review component source code
3. Check console logs for errors
4. Submit an issue with details

## Credits

Built for Bakestro - Pakistan's finest bakery. Modern design meets traditional taste.

---

**Version:** 1.0.0  
**Last Updated:** April 2026  
**Status:** Production Ready
