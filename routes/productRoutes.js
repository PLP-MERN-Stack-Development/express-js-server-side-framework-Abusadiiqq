const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { NotFoundError } = require('../utils/errors');
const authenticate = require('../middleware/auth');
const { validateProduct } = require('../middleware/validation');

// Apply authentication to all routes
router.use(authenticate);

// GET /api/products - List all products with filtering, pagination, and search
router.get('/', async (req, res, next) => {
    try {
        const { category, inStock, search, page = 1, limit = 10 } = req.query;
        
        // Build filter object
        const filter = {};
        if (category) filter.category = category;
        if (inStock !== undefined) filter.inStock = inStock === 'true';
        if (search) {
            filter.$text = { $search: search };
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Execute query
        const products = await Product.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        // Get total count for pagination info
        const total = await Product.countDocuments(filter);
        
        res.json({
            success: true,
            count: products.length,
            total,
            pagination: {
                page: parseInt(page),
                pages: Math.ceil(total / parseInt(limit)),
                limit: parseInt(limit)
            },
            data: products
        });
    } catch (error) {
        next(error);
    }
});

// GET /api/products/search - Search products by name
router.get('/search', async (req, res, next) => {
    try {
        const { q } = req.query;
        
        if (!q) {
            return res.status(400).json({
                success: false,
                error: 'Search query is required'
            });
        }

        const products = await Product.find({
            $text: { $search: q }
        }).sort({ score: { $meta: 'textScore' } });

        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
});

// GET /api/products/stats - Get product statistics
router.get('/stats', async (req, res, next) => {
    try {
        const stats = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    averagePrice: { $avg: '$price' },
                    totalValue: { $sum: '$price' },
                    inStockCount: {
                        $sum: { $cond: ['$inStock', 1, 0] }
                    }
                }
            },
            {
                $project: {
                    category: '$_id',
                    count: 1,
                    averagePrice: { $round: ['$averagePrice', 2] },
                    totalValue: { $round: ['$totalValue', 2] },
                    inStockCount: 1,
                    outOfStockCount: { $subtract: ['$count', '$inStockCount'] }
                }
            },
            { $sort: { count: -1 } }
        ]);

        const totalStats = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalProducts: { $sum: 1 },
                    totalValue: { $sum: '$price' },
                    inStockProducts: {
                        $sum: { $cond: ['$inStock', 1, 0] }
                    }
                }
            }
        ]);

        res.json({
            success: true,
            data: {
                byCategory: stats,
                summary: totalStats[0] || {}
            }
        });
    } catch (error) {
        next(error);
    }
});

// GET /api/products/:id - Get specific product by ID
router.get('/:id', async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            throw new NotFoundError('Product');
        }
        
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
});

// POST /api/products - Create a new product
router.post('/', validateProduct, async (req, res, next) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        
        res.status(201).json({
            success: true,
            data: savedProduct
        });
    } catch (error) {
        next(error);
    }
});

// PUT /api/products/:id - Update an existing product
router.put('/:id', validateProduct, async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!product) {
            throw new NotFoundError('Product');
        }
        
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
});

// DELETE /api/products/:id - Delete a product
router.delete('/:id', async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if (!product) {
            throw new NotFoundError('Product');
        }
        
        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;