// routes/user.js

const express = require('express');
const router = express.Router();
const { register, login, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { validateRegister } = require('../middleware/validate');

// Foydalanuvchi ro‘yxatdan o‘tishi va validatsiya
router.post('/register', validateRegister, register);

// Foydalanuvchi login
router.post('/login', login);

// Foydalanuvchi ma'lumotlarini olish
router.get('/me', protect, getUserProfile);

module.exports = router;
