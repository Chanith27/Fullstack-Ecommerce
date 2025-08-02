# Lanka Basket API Documentation

This API documentation is automatically generated using Swagger/OpenAPI 3.0 specification.

## Access the Documentation

Once your server is running, you can access the interactive API documentation at:

```
http://localhost:8080/api-docs
```

## Features

- **Interactive Documentation**: Test API endpoints directly from the browser
- **Authentication Support**: Built-in support for JWT token authentication
- **Schema Validation**: Request/response schemas with examples
- **Organized by Tags**: Endpoints grouped by functionality

## API Categories

### 🔐 User Authentication
- User registration and email verification
- Login/logout functionality
- Password reset and forgot password
- Token refresh mechanism

### 👤 User Profile
- Update user details
- Upload avatar images
- Get user information

### 🏷️ Categories
- Create, read, update, delete categories
- Category-based product filtering

### 📦 Products
- Product management (CRUD operations)
- Search functionality
- Category and subcategory filtering
- Pagination support

### 🛒 Cart
- Add/remove items from cart
- Update item quantities
- View cart contents

### 📋 Orders
- Cash on delivery orders
- Stripe payment integration
- Order history and tracking
- Webhook handling

### 📍 Addresses
- Manage delivery addresses
- Multiple address support

## Authentication

The API uses two authentication methods:

1. **Cookie Authentication**: Automatic cookie-based auth (primary method)
2. **Bearer Token**: JWT token in Authorization header

### How to Authenticate in Swagger UI

1. **Login**: Use the `/api/user/login` endpoint to get your access token
2. **Authorize**: Click the "Authorize" button in Swagger UI
3. **Enter Token**: Paste your token (with 'Bearer ' prefix) or use cookie auth

## Environment Setup

Make sure your `.env` file contains:

```env
VITE_API_URL=http://localhost:8080
# ... other environment variables
```

## Development

To run the server with API documentation:

```bash
cd server
npm install
npm run dev
```

The API documentation will be available at `http://localhost:8080/api-docs`

## API Endpoints Overview

### Authentication & User Management
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `GET /api/user/logout` - User logout
- `GET /api/user/user-details` - Get user profile
- `PUT /api/user/update-user` - Update user details

### Product Management
- `GET /api/product/get` - Get all products
- `POST /api/product/create` - Create product (Admin)
- `POST /api/product/search-product` - Search products
- `POST /api/product/get-product-details` - Get product details

### Category Management
- `GET /api/category/get` - Get all categories
- `POST /api/category/add-category` - Add category (Admin)
- `PUT /api/category/update` - Update category (Admin)

### Cart Management
- `GET /api/cart/get` - Get cart items
- `POST /api/cart/create` - Add item to cart
- `PUT /api/cart/update-qty` - Update item quantity
- `DELETE /api/cart/delete-cart-item` - Remove item from cart

### Order Management
- `GET /api/order/order-list` - Get order history
- `POST /api/order/cash-on-delivery` - Create COD order
- `POST /api/order/checkout` - Create Stripe payment session

## Response Format

All API responses follow this standard format:

```json
{
  "message": "Success/Error message",
  "error": false,
  "data": {
    // Response data
  }
}
```

## Error Handling

Error responses include:
- HTTP status codes
- Descriptive error messages
- Validation error details (when applicable)

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting for production use.

## Support

For API support or questions, contact the development team.
