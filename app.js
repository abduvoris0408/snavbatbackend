// app.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const queueRoutes = require('./routes/queue');
const organizationRoutes = require('./routes/organization');
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config();

// Serverni yaratamiz
const app = express();

// Body parser
app.use(express.json());

// CORS sozlamalari
app.use(cors());

// MongoDB bilan ulanish
connectDB();

// API endpointlarni ulaymiz
app.use('/api/users', userRoutes);
app.use('/api/queues', queueRoutes);
app.use('/api/organizations', organizationRoutes);

// Xatoliklarni boshqarish middleware'ini qo‘shamiz
app.use(errorHandler);

module.exports = app;
