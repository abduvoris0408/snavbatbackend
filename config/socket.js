// config/socket.js

module.exports = function(io) {
    io.on('connection', (socket) => {
      console.log(`🔌 Yangi socket ulanish: ${socket.id}`);
  
      // Navbatga yangi foydalanuvchi qo'shilganda xabar yuborish
      socket.on('queue:add', (data) => {
        console.log('Yangi navbat:', data);
        io.emit('queue:update', data); // Barcha foydalanuvchilarga yangilanishni yuborish
      });
  
      // Ulanuvchi uzilganda
      socket.on('disconnect', () => {
        console.log(`⚡ Socket uzildi: ${socket.id}`);
      });
    });
  };
