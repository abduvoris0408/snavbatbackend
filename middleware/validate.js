// middleware/validate.js

const { check, validationResult } = require('express-validator');

// Foydalanuvchi ro‘yxatdan o‘tishi uchun validatsiya
const validateRegister = [
  check('email', 'Email to‘g‘ri kiritilmagan').isEmail(),
  check('password', 'Parol kamida 6 ta belgi bo‘lishi kerak').isLength({ min: 6 }),
  check('name', 'Ismni kiriting').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateRegister };
