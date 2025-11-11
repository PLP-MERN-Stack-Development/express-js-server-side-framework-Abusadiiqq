# 🚀 Express.js Products API - Week 2 Assignment

A complete RESTful API built with Express.js for managing products with full CRUD operations, authentication, validation, and advanced features.

## 📋 Features

- ✅ **Full CRUD Operations** - Create, Read, Update, Delete products
- ✅ **Authentication Middleware** - API key-based authentication
- ✅ **Custom Middleware** - Request logging, validation, error handling
- ✅ **Advanced Features** - Search, pagination, filtering, statistics
- ✅ **Error Handling** - Global error handling with custom error classes
- ✅ **Data Validation** - Input validation for all requests
- ✅ **MongoDB Integration** - Persistent data storage with Mongoose

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/PLP-MERN-Stack-Development/express-js-server-side-framework-Abusadiiqq.git
cd express-js-server-side-framework-Abusadiiqq

2. Install Dependencies
bash
npm install
3. Environment Configuration
Create a .env file in the root directory:

env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/products_database?retryWrites=true&w=majority
API_KEY=your-secret-api-key-12345
NODE_ENV=development
4. Start the Server
bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
Expected Output:

text
🚀 Server running in development mode on port 3000
✅ MongoDB Connected: cluster0-shard-00-00.mongodb.net
🔐 Authentication
All API endpoints require authentication via API key in the request headers:

http
x-api-key: your-secret-api-key-12345
📚 API Endpoints Documentation
Base URL: http://localhost:3000/api
Products Endpoints
Method	Endpoint	Description	Auth Required
GET	/products	Get all products with filtering & pagination	✅
GET	/products/search	Search products by name/description	✅
GET	/products/stats	Get product statistics by category	✅
GET	/products/:id	Get single product by ID	✅
POST	/products	Create new product	✅
PUT	/products/:id	Update product by ID	✅
DELETE	/products/:id	Delete product by ID	✅
📝 API Usage Examples
1. Get All Products (with pagination)
Request:

bash
curl -X GET "http://localhost:3000/api/products?page=1&limit=5" \
  -H "x-api-key: your-secret-api-key-12345"
Response:

json
{
  "success": true,
  "count": 5,
  "total": 12,
  "pagination": {
    "page": 1,
    "pages": 3,
    "limit": 5
  },
  "data": [
    {
      "_id": "65a1b2c3d4e5f67890123456",
      "name": "iPhone 15",
      "description": "Latest Apple smartphone",
      "price": 999,
      "category": "Electronics",
      "inStock": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
2. Search Products
Request:

bash
curl -X GET "http://localhost:3000/api/products/search?q=laptop" \
  -H "x-api-key: your-secret-api-key-12345"
Response:

json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "65a1b2c3d4e5f67890123457",
      "name": "Gaming Laptop",
      "description": "High-performance gaming laptop",
      "price": 1299,
      "category": "Electronics",
      "inStock": true
    }
  ]
}
3. Get Product Statistics
Request:

bash
curl -X GET "http://localhost:3000/api/products/stats" \
  -H "x-api-key: your-secret-api-key-12345"
Response:

json
{
  "success": true,
  "data": {
    "byCategory": [
      {
        "category": "Electronics",
        "count": 5,
        "averagePrice": 799.99,
        "totalValue": 3999.95,
        "inStockCount": 4,
        "outOfStockCount": 1
      }
    ],
    "summary": {
      "totalProducts": 12,
      "totalValue": 8599.88,
      "inStockProducts": 10
    }
  }
}
4. Create a New Product
Request:

bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-api-key-12345" \
  -d '{
    "name": "MacBook Pro",
    "description": "Apple MacBook Pro 16-inch",
    "price": 2399,
    "category": "Electronics",
    "inStock": true
  }'
Response:

json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f67890123458",
    "name": "MacBook Pro",
    "description": "Apple MacBook Pro 16-inch",
    "price": 2399,
    "category": "Electronics",
    "inStock": true,
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
5. Get Product by ID
Request:

bash
curl -X GET "http://localhost:3000/api/products/65a1b2c3d4e5f67890123456" \
  -H "x-api-key: your-secret-api-key-12345"
Response:

json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f67890123456",
    "name": "iPhone 15",
    "description": "Latest Apple smartphone",
    "price": 999,
    "category": "Electronics",
    "inStock": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
6. Update a Product
Request:

bash
curl -X PUT "http://localhost:3000/api/products/65a1b2c3d4e5f67890123456" \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-api-key-12345" \
  -d '{
    "price": 899,
    "inStock": false
  }'
Response:

json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f67890123456",
    "name": "iPhone 15",
    "description": "Latest Apple smartphone",
    "price": 899,
    "category": "Electronics",
    "inStock": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:40:00.000Z"
  }
}
7. Delete a Product
Request:

bash
curl -X DELETE "http://localhost:3000/api/products/65a1b2c3d4e5f67890123456" \
  -H "x-api-key: your-secret-api-key-12345"
Response:

json
{
  "success": true,
  "message": "Product deleted successfully"
}
🔧 Query Parameters
GET /api/products
category - Filter by category (Electronics, Clothing, Books, etc.)

inStock - Filter by stock status (true/false)

search - Search in name and description

page - Page number (default: 1)

limit - Items per page (default: 10)

Examples:

?category=Electronics&inStock=true

?search=phone&page=2&limit=5

?category=Books&page=1&limit=20

GET /api/products/search
q - Search query (required)

🗄️ Product Schema
javascript
{
  name: String (required, max: 100 characters),
  description: String (required, max: 500 characters),
  price: Number (required, min: 0),
  category: String (required, enum: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Other']),
  inStock: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
🚨 Error Handling
The API returns standardized error responses:

Authentication Error (401)
json
{
  "success": false,
  "error": "Invalid API key"
}
Validation Error (400)
json
{
  "success": false,
  "error": "Product name is required, Price must be a positive number"
}
Not Found Error (404)
json
{
  "success": false,
  "error": "Product not found"
}
Server Error (500)
json
{
  "success": false,
  "error": "Server Error"
}
🧪 Testing the API
Using curl (Command Line)
bash
# Test home route
curl http://localhost:3000/

# Test authentication (should fail without API key)
curl http://localhost:3000/api/products

# Test with API key
curl -H "x-api-key: your-secret-api-key-12345" http://localhost:3000/api/products
Using Postman
Set base URL: http://localhost:3000/api

Add header: x-api-key: your-secret-api-key-12345

Test all endpoints as shown in examples

📁 Project Structure
text
week2-express-assignment/
├── config/
│   └── db.js                 # Database connection
├── middleware/
│   ├── auth.js              # Authentication middleware
│   ├── logger.js            # Request logging
│   ├── validation.js        # Input validation
│   └── errorHandler.js      # Global error handling
├── models/
│   └── Product.js           # Product schema and model
├── routes/
│   └── productRoutes.js     # All product routes
├── utils/
│   └── errors.js            # Custom error classes
├── .env                     # Environment variables
├── .env.example             # Environment template
├── package.json             # Dependencies and scripts
├── server.js                # Main server file
└── README.md                # This file
🛠️ Dependencies
express - Web framework

mongoose - MongoDB ODM

dotenv - Environment variables

uuid - Unique ID generation

👨‍💻 Author
Abusadiiqq
PLP MERN Stack Development Program

📄 License
This project is part of the PLP Academy MERN Stack Development program assignments.

text

## 🚀 Add This README to Your Project

Run these commands to add the README:

```bash
# Create the README.md file with the content above
# Copy and paste the entire README content into a new README.md file

# Add it to git
git add README.md

# Commit and push
git commit -m "Add comprehensive README with setup instructions and API documentation"
git push origin main
📋 Also Create .env.example
bash
# Create .env.example
echo "PORT=3000" > .env.example
echo "MONGODB_URI=your_mongodb_connection_string_here" >> .env.example
echo "API_KEY=your_secret_api_key_here" >> .env.example
echo "NODE_ENV=development" >> .env.example

# Add it to git
git add .env.example
git commit -m "Add environment example file"
git push origin main
This README provides complete documentation as required by your assignment! 📚✨
