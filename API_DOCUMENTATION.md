# Bakestro API Documentation

## Overview
This document outlines all the API endpoints and database schema changes implemented for the Bakestro bakery website redesign.

---

## Database Schema Updates

### 1. Product Model (Updated)
**File:** `server/models/Product.js`

```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  category: String (required),
  image: String (required),
  rating: Number (default: 4.5),
  isFeatured: Boolean (default: false),
  inStock: Boolean (default: true),
  pricingUnit: String (enum: ['piece', 'kg', 'box', 'dozen'], default: 'piece'),  // NEW
  createdAt: Date (default: now),
  updatedAt: Date (default: now)  // NEW
}
```

**Changes:**
- Added `pricingUnit` field to support different pricing units (piece, kg, box, dozen)
- Added `updatedAt` field for tracking modifications

---

### 2. Deal Model (New)
**File:** `server/models/Deal.js`

```javascript
{
  productId: ObjectId (ref: Product, required),
  discountPercentage: Number (required, 0-100),
  discountPrice: Number (required),
  isActive: Boolean (default: true),
  startDate: Date (default: now),
  endDate: Date (optional),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

**Purpose:** Manages discount deals for products with percentage-based discounts and optional expiration dates.

---

### 3. Announcement Model (New)
**File:** `server/models/Announcement.js`

```javascript
{
  text: String (required),
  isActive: Boolean (default: true),
  displayOrder: Number (default: 0),
  startDate: Date (default: now),
  endDate: Date (optional),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

**Purpose:** Manages scrolling announcement bar messages that rotate on the homepage.

---

## API Endpoints

### Products

#### GET /api/products
- **Description:** Get all products
- **Authentication:** None
- **Query Parameters:** None
- **Response:** Array of Product objects
- **Status:** 200

#### GET /api/products/:id
- **Description:** Get product by ID
- **Authentication:** None
- **Response:** Single Product object
- **Status:** 200 or 404

#### POST /api/products
- **Description:** Create new product
- **Authentication:** Required (Admin)
- **Body:**
```json
{
  "name": "Product Name",
  "description": "Description",
  "price": 500,
  "category": "speciality",
  "image": "/path/to/image.png",
  "rating": 4.5,
  "pricingUnit": "piece"
}
```
- **Response:** Created Product object
- **Status:** 201

#### PUT /api/products/:id
- **Description:** Update product
- **Authentication:** Required (Admin)
- **Body:** Partial Product object
- **Response:** Updated Product object
- **Status:** 200 or 404

#### DELETE /api/products/:id
- **Description:** Delete product
- **Authentication:** Required (Admin)
- **Response:** Success message
- **Status:** 200 or 404

---

### Deals

#### GET /api/deals
- **Description:** Get active deals (public)
- **Authentication:** None
- **Response:** Array of active Deal objects with populated product info
- **Status:** 200

#### GET /api/deals/:id
- **Description:** Get deal by ID
- **Authentication:** None
- **Response:** Single Deal object
- **Status:** 200 or 404

#### GET /api/deals/all
- **Description:** Get all deals (admin view)
- **Authentication:** Required (Admin)
- **Response:** Array of all Deal objects
- **Status:** 200

#### POST /api/deals
- **Description:** Create new deal
- **Authentication:** Required (Admin)
- **Body:**
```json
{
  "productId": "MongoDB ObjectId",
  "discountPercentage": 25,
  "discountPrice": 375,
  "isActive": true,
  "endDate": "2025-12-31T23:59:59Z"
}
```
- **Response:** Created Deal object
- **Status:** 201

#### PUT /api/deals/:id
- **Description:** Update deal
- **Authentication:** Required (Admin)
- **Body:** Partial Deal object
- **Response:** Updated Deal object
- **Status:** 200 or 404

#### DELETE /api/deals/:id
- **Description:** Delete deal
- **Authentication:** Required (Admin)
- **Response:** Success message
- **Status:** 200 or 404

---

### Announcements

#### GET /api/announcements
- **Description:** Get active announcements (public)
- **Authentication:** None
- **Response:** Array of active Announcement objects
- **Status:** 200

#### GET /api/announcements/:id
- **Description:** Get announcement by ID
- **Authentication:** None
- **Response:** Single Announcement object
- **Status:** 200 or 404

#### GET /api/announcements/all
- **Description:** Get all announcements (admin view)
- **Authentication:** Required (Admin)
- **Response:** Array of all Announcement objects
- **Status:** 200

#### POST /api/announcements
- **Description:** Create new announcement
- **Authentication:** Required (Admin)
- **Body:**
```json
{
  "text": "Free delivery on orders above Rs. 2000",
  "isActive": true,
  "displayOrder": 1,
  "endDate": "2025-12-31T23:59:59Z"
}
```
- **Response:** Created Announcement object
- **Status:** 201

#### PUT /api/announcements/:id
- **Description:** Update announcement
- **Authentication:** Required (Admin)
- **Body:** Partial Announcement object
- **Response:** Updated Announcement object
- **Status:** 200 or 404

#### DELETE /api/announcements/:id
- **Description:** Delete announcement
- **Authentication:** Required (Admin)
- **Response:** Success message
- **Status:** 200 or 404

---

## Frontend Integration

### API Service Methods
**File:** `client/src/services/api.js`

```javascript
// Products
productAPI.getProducts()
productAPI.getProductById(id)
productAPI.createProduct(data)
productAPI.updateProduct(id, data)
productAPI.deleteProduct(id)

// Deals
dealsAPI.getDeals()
dealsAPI.createDeal(data)
dealsAPI.updateDeal(id, data)
dealsAPI.deleteDeal(id)

// Announcements
announcementAPI.getAnnouncements()
announcementAPI.createAnnouncement(data)
announcementAPI.updateAnnouncement(id, data)
announcementAPI.deleteAnnouncement(id)
```

---

## New Components

### Homepage Components
1. **AnnouncementBar** - Scrolling announcement bar with configurable messages
2. **DealsSection** - Product deals showcase with discount badges
3. **WhyChooseUs** - Feature cards highlighting bakery benefits
4. **Testimonials** - Customer testimonials carousel
5. **Newsletter** - Email subscription form

### Admin Dashboard Pages
1. **Products** (`/admin/products`) - Full product management with pricing units
2. **Deals** (`/admin/deals`) - Deal creation and management with discount calculator

---

## Admin Routes

- `/admin` - Overview dashboard
- `/admin/products` - Products management
- `/admin/orders` - Orders management
- `/admin/users` - Customers management
- `/admin/deals` - Deals management

---

## Key Features

### Pricing Units
Products now support flexible pricing units:
- Per Piece
- Per KG
- Per Box
- Per Dozen

Set via the `pricingUnit` field in the product form or API.

### Deals Management
- Create discounts by percentage
- Automatic price calculation
- Optional expiration dates
- Active/inactive toggle for quick management

### Announcements
- Scrolling message bar on homepage
- Configurable display order
- Optional date ranges
- Can be managed via admin panel

---

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

---

## Authentication

Admin routes require:
1. Valid JWT token in Authorization header: `Bearer {token}`
2. User must have admin role

---

## Next Steps

1. Set up MongoDB with the new schema
2. Test all API endpoints
3. Configure environment variables for API_URL
4. Deploy to production server
