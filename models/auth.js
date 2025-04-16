// models/Auth.js

const mongoose = require('mongoose');

// Auth Schema
const authSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;
