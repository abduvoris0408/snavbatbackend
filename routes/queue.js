// routes/queue.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getQueuesByService, addToQueue } = require('../controllers/queueController');

// Xizmat bo'yicha barcha navbatlarni olish
router.get('/service', protect, getQueuesByService);

// Navbat qo'shish
router.post('/add', protect, addToQueue);

module.exports = router;
