// middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Auth middleware: JWT tokenni tekshirish
const protect = async (req, res, next) => {
  let token;

  // Tokenni HTTP so'rovining 'Authorization' sarlavhasidan olish
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Tokenni olish
      token = req.headers.authorization.split(' ')[1];

      // JWT tokenni tekshirish
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Tokenni tekshirgandan keyin, foydalanuvchini req.user ga joylash
      req.user = await User.findById(decoded.id).select('-password');
      
      next(); // Keyingi middleware'ga o'tish
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Token noto‘g‘ri yoki muddati o‘tgan' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Token yo‘q' });
  }
};

module.exports = { protect };
