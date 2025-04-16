// routes/organization.js

const express = require('express');
const router = express.Router();
const { addOrganization, getOrganizations } = require('../controllers/organizationController');

// Tashkilot qo‘shish (Admin uchun)
router.post('/', addOrganization);

// Barcha tashkilotlarni olish
router.get('/', getOrganizations);

module.exports = router;
