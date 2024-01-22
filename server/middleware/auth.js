const jwt = require('jsonwebtoken');

// Middleware for JWT authentication
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
        req.user = user;
        next();
    });
};



// Middleware for checking if the user is an admin
const isAdmin = (req, res, next) => {
    if (!req.user.admin) {
        return res.status(403).json({ message: 'Admin access required.' });
    }
    next();
};


module.exports = { authenticateToken, isAdmin };
