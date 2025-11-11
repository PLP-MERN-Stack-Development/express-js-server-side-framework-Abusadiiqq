const { ValidationError } = require('../utils/errors');

// Validation middleware for product creation
const validateProduct = (req, res, next) => {
    const { name, description, price, category } = req.body;
    const errors = [];

    if (!name || name.trim().length === 0) {
        errors.push('Product name is required');
    }

    if (!description || description.trim().length === 0) {
        errors.push('Product description is required');
    }

    if (price === undefined || price === null) {
        errors.push('Product price is required');
    } else if (typeof price !== 'number' || price < 0) {
        errors.push('Price must be a positive number');
    }

    if (!category || category.trim().length === 0) {
        errors.push('Product category is required');
    }

    const validCategories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Other'];
    if (category && !validCategories.includes(category)) {
        errors.push(`Category must be one of: ${validCategories.join(', ')}`);
    }

    if (errors.length > 0) {
        throw new ValidationError(errors.join(', '));
    }

    next();
};

module.exports = {
    validateProduct
};