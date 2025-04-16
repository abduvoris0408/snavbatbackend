const Queue = require('../models/Queue');
const asyncHandler = require('../utils/asyncHandler');

exports.addToQueue = asyncHandler(async (req, res) => {
  const { service, timeSlot } = req.body;

  // Foydalanuvchi ID'sini olish
  const userId = req.user.id;

  // Vaqt bandligini tekshirish
  const isTimeSlotTaken = await Queue.findOne({ timeSlot, service });
  if (isTimeSlotTaken) {
    return res.status(400).json({
      message: 'Ushbu vaqt band qilingan. Iltimos, boshqa vaqtni tanlang.',
    });
  }

  // Navbatni yaratish
  const queue = new Queue({ user: userId, service, timeSlot });
  await queue.save();

  // Real vaqt yangilanishi uchun Socket.io orqali xabar yuborish
  const io = req.app.get('io');
  io.emit('queue:update', { user: userId, queue });

  res.status(201).json({
    message: 'Navbat muvaffaqiyatli yaratildi',
    queue,
  });
});

// Xizmat bo'yicha barcha navbatlarni olish
exports.getQueuesByService = asyncHandler(async (req, res) => {
  const { service } = req.query; // Xizmat nomini so'rovdan olish

  if (!service) {
    return res.status(400).json({ message: 'Xizmat nomi talab qilinadi.' });
  }

  // Ushbu xizmatga tegishli barcha navbatlarni olish
  const queues = await Queue.find({ service }).populate('user', 'name email'); // Foydalanuvchi ma'lumotlarini qo'shish

  res.status(200).json({
    message: `Xizmat "${service}" uchun barcha navbatlar`,
    queues,
  });
});