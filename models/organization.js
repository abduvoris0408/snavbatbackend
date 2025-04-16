// models/Organization.js

const mongoose = require('mongoose');

// Organization Schema
const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,  // Tashkilot nomi unikal bo'lishi kerak
    },
    description: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      required: true,  // Tashkilotning joylashuvi
    },
    services: [{
      type: String,
      required: true,  // Xizmat turlari ro‘yxati
    }],
    schedule: {
      type: Map,
      of: String,  // Har bir kun uchun vaqtni saqlash (masalan: "monday": "9:00-18:00")
    },
    phoneNumber: {
      type: String,
      required: true,  // Tashkilotning telefon raqami
    },
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  // Email format tekshiruvi
    },
    website: {
      type: String,
      default: '',  // Tashkilotning rasmiy veb-sayti
    },
  },
  { timestamps: true }  // Yaratilgan va yangilangan vaqtlar
);

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;
