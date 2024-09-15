const jwt = require('jsonwebtoken');

const ACCESS_TOKEN = process.env.ACCESS_TOKEN || 'normal-token';

// Middleware to verify the JWT token, but exclude certain routes
const verifyToken = (req, res, next) => {
    // List of routes/methods to exclude from JWT verification
    const excludedRoutes = [
        { path: '/api/signup', method: 'POST' }, 
        { path: '/api/login', method: 'POST' }    
    ];

    // Check if the current route and method are in the excluded list
    const isExcluded = excludedRoutes.some(
        route => route.path === req.path && route.method === req.method
    );

    if (isExcluded) {
        // Skip JWT verification for this request
        return next();
    }
    // Otherwise, proceed with JWT verification
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(403).json({ error: 'Token missing in authorization header' });
    }

    try {
        // Verify the token using the secret
        const decoded = jwt.verify(token, ACCESS_TOKEN);

        // Attach the decoded token data to the request object for further use
        req.user = decoded;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = verifyToken;
