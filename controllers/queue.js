// controllers/queueController.js

const Queue = require('../models/Queue');

// Navbatga yozilish
exports.addToQueue = async (req, res) => {
  const { service, number } = req.body;

  try {
    const queue = new Queue({ user: req.user.id, service, number });
    await queue.save();
    res.status(201).json(queue);
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi', error: error.message });
  }
};

// Navbatlar ro‘yxatini olish
exports.getUserQueues = async (req, res) => {
  try {
    const queues = await Queue.find({ user: req.user.id });
    res.json(queues);
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi', error: error.message });
  }
};
