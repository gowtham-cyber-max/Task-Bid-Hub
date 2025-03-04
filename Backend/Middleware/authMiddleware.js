const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function (req, res, next) {
    // Extract token from cookies instead of Authorization header
    const token = req.cookies.token;
    
    // Check if token is missing
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    
    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
  
