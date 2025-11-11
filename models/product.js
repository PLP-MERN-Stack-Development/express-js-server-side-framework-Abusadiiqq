const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        enum: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Other']
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Add text search index
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);