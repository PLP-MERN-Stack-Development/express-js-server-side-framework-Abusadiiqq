const { AuthenticationError } = require('../utils/errors');

// Authentication middleware
const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
        throw new AuthenticationError('API key is required');
    }
    
    if (apiKey !== process.env.API_KEY) {
        throw new AuthenticationError('Invalid API key');
    }
    
    next();
};

module.exports = authenticate;