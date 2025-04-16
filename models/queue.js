// models/Queue.js

const mongoose = require('mongoose');

// Queue Schema
const queueSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: Date, // Vaqtni saqlash uchun
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Queue', queueSchema);
