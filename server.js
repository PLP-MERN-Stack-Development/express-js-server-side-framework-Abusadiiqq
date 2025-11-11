const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Route files
const productRoutes = require('./routes/productRoutes');

// Middleware files
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Logger middleware
app.use(logger);

// Home route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🚀 Welcome to Products API',
        version: '1.0.0',
        endpoints: {
            products: '/api/products',
            search: '/api/products/search',
            stats: '/api/products/stats'
        },
        documentation: 'See README.md for API documentation'
    });
});

// Mount routes
app.use('/api/products', productRoutes);

// Handle 404 - Resource not found
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Resource not found'
    });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});