# Bakestro Website Redesign - Implementation Guide

## Project Overview
This is a comprehensive redesign of the Bakestro bakery website with new homepage components, admin dashboard features, and database schema updates.

---

## What's New

### Frontend Features

#### 1. Homepage Enhancements
- **Announcement Bar** - Scrolling promotional messages
- **Enhanced Hero Section** - Existing carousel with new styling
- **Deals Section** - Dynamic discounted products showcase
- **Featured Products** - Grid display of bakery items
- **Why Choose Us** - Feature cards highlighting business benefits
- **Testimonials** - Customer reviews carousel
- **Newsletter** - Email subscription form

#### 2. Admin Dashboard
- **Products Management** (`/admin/products`)
  - Create, read, update, delete products
  - Pricing unit configuration (piece, kg, box, dozen)
  - Rating management
  - Image URL management

- **Deals Management** (`/admin/deals`)
  - Create discount deals by product
  - Discount percentage configuration
  - Automatic price calculation
  - Active/inactive toggle
  - Expiration date management

### Backend Enhancements

#### New Database Collections
1. **Deals** - Manages product discounts
2. **Announcements** - Manages homepage announcement messages

#### Updated Collections
1. **Products** - Added `pricingUnit` field

#### New API Routes
- `/api/deals` - Deal management endpoints
- `/api/announcements` - Announcement management endpoints

---

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. **Install Dependencies**
```bash
cd server
npm install
```

2. **Configure Environment Variables**
Create `.env` file in server directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bakestro
JWT_SECRET=your_jwt_secret_key
```

3. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

4. **Start Server**
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server should be running at `http://localhost:5000`

### Frontend Setup

1. **Install Dependencies**
```bash
cd client
npm install
```

2. **Configure API URL**
Ensure `client/src/services/api.js` has correct API URL:
```javascript
const API_URL = 'http://localhost:5000/api';
```

3. **Start Development Server**
```bash
npm run dev
```

Frontend should be running at `http://localhost:5173` (Vite)

---

## File Structure

### New Frontend Files
```
client/src/
├── components/
│   ├── AnnouncementBar/
│   │   ├── AnnouncementBar.jsx
│   │   └── AnnouncementBar.css
│   ├── DealsSection/
│   │   ├── DealsSection.jsx
│   │   └── DealsSection.css
│   ├── WhyChooseUs/
│   │   ├── WhyChooseUs.jsx
│   │   └── WhyChooseUs.css
│   ├── Testimonials/
│   │   ├── Testimonials.jsx
│   │   └── Testimonials.css
│   └── Newsletter/
│       ├── Newsletter.jsx
│       └── Newsletter.css
└── pages/
    └── Admin/
        ├── Products.jsx
        ├── Products.css
        ├── Deals.jsx
        └── Deals.css
```

### New Backend Files
```
server/
├── models/
│   ├── Deal.js (NEW)
│   ├── Announcement.js (NEW)
│   └── Product.js (UPDATED)
├── controllers/
│   ├── dealController.js (NEW)
│   ├── announcementController.js (NEW)
│   └── productController.js (UPDATED)
├── routes/
│   ├── dealRoutes.js (NEW)
│   ├── announcementRoutes.js (NEW)
│   └── productRoutes.js (UPDATED)
└── server.js (UPDATED)
```

---

## Database Setup

### Create Collections (MongoDB)

The collections will be automatically created when you first create documents through the API. Alternatively, you can pre-create them with the schema.

### Sample Data

You can add sample data using MongoDB Compass or the API endpoints.

**Sample Product:**
```json
{
  "name": "Premium Nan Khatai - Badam",
  "description": "Crunchiest Nan Khatai ever with loaded almonds",
  "price": 1400,
  "pricingUnit": "piece",
  "category": "speciality",
  "image": "/images/product1.png",
  "rating": 4.8,
  "isFeatured": true,
  "inStock": true
}
```

**Sample Deal:**
```json
{
  "productId": "{{product_id}}",
  "discountPercentage": 25,
  "discountPrice": 1050,
  "isActive": true
}
```

**Sample Announcement:**
```json
{
  "text": "Free delivery on orders above Rs. 2000",
  "isActive": true,
  "displayOrder": 1
}
```

---

## Key Features & Usage

### 1. Pricing Units
When creating/updating products in the admin panel, select the appropriate pricing unit:
- **Piece** - Individual items
- **KG** - Weight-based pricing
- **Box** - Package deals
- **Dozen** - 12-piece sets

### 2. Deals Management
1. Navigate to `/admin/deals`
2. Click "Create Deal"
3. Select a product from the dropdown
4. Enter discount percentage
5. System automatically calculates the discounted price
6. Set expiration date (optional)
7. Toggle active status
8. Save deal

The deal will appear on the homepage in the DealsSection and show a discount badge.

### 3. Announcements
1. Navigate to Admin Settings (future implementation)
2. Manage announcements
3. Messages rotate every 5 seconds
4. Can be disabled by closing the bar

---

## API Testing

### Using Postman or cURL

**Create a Product:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Name",
    "price": 500,
    "category": "speciality",
    "description": "Description",
    "image": "/images/product.png",
    "pricingUnit": "piece"
  }'
```

**Get All Deals:**
```bash
curl http://localhost:5000/api/deals
```

**Create a Deal:**
```bash
curl -X POST http://localhost:5000/api/deals \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "{{product_id}}",
    "discountPercentage": 25,
    "discountPrice": 375,
    "isActive": true
  }'
```

---

## Troubleshooting

### API Connection Issues
1. Ensure backend is running on port 5000
2. Check MONGODB_URI in .env file
3. Verify MongoDB is running
4. Check browser console for CORS errors

### Missing Components
1. Run `npm install` in both client and server directories
2. Check all imports are correct
3. Verify file paths match the file structure

### Styling Issues
1. Ensure CSS files are imported in component files
2. Check that Tailwind CSS is configured
3. Verify color variables in index.css

---

## Best Practices

### For Developers
1. Always use the API services from `client/src/services/api.js`
2. Add error handling with try-catch blocks
3. Use toast notifications for user feedback
4. Implement loading states in UI
5. Follow existing code patterns

### For Admin Users
1. Always set pricingUnit when creating products
2. Test deals before making them active
3. Monitor deal expiration dates
4. Keep announcements concise and relevant

---

## Performance Optimization

### Frontend
- Images are lazy-loaded in product grids
- Components use React.memo where appropriate
- Carousel uses Swiper for smooth animations
- CSS is organized and minified in production

### Backend
- Database queries are indexed on frequently searched fields
- API responses use pagination (future implementation)
- Caching strategies for public endpoints

---

## Security

### Authentication
- All admin endpoints require JWT token
- Tokens stored securely in localStorage
- Middleware checks admin role for sensitive operations

### Input Validation
- Server-side validation on all endpoints
- Mongoose schema validation
- Sanitization of user inputs

---

## Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy dist folder to Vercel
```

### Backend (Node Hosting)
```bash
# Set environment variables on hosting platform
# DATABASE: MongoDB connection string
# JWT_SECRET: Secure secret key
# Deploy to your Node hosting service
```

---

## Future Enhancements

1. **Admin Settings Page** - Manage announcements from UI
2. **Analytics Dashboard** - Track sales and popular products
3. **Inventory Management** - Track stock levels
4. **Email Notifications** - Send newsletters to subscribers
5. **Payment Integration** - Stripe/PayPal integration
6. **Order Tracking** - Real-time order status updates

---

## Support & Documentation

- API Documentation: See `API_DOCUMENTATION.md`
- Component Documentation: Check component JSDoc comments
- Backend Model Documentation: Check model files for schema details

---

## Version History

**v1.0.0** - Initial Release
- New homepage components
- Products management
- Deals management
- Announcement bar
- Admin dashboard enhancements
