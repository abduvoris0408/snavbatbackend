//Bismillahir rahmanir rahim

require('dotenv').config()
const http = require('http')
const app = require('./app')
const connectDB = require('./config/db')

// Portni olish .env yoki 5000 dan
const PORT = process.env.PORT || 5000

// HTTP server yaratamiz
const server = http.createServer(app)

// Socket.io ulash (agar kerak bo‘lsa)
const { Server } = require('socket.io')
const io = new Server(server, {
	cors: {
		origin: '*', // Xavfsiz qilish uchun prod-da domenni belgilang
	},
})
require('./config/socket')(io) // socket konfiguratsiyasi shu faylda

// Socket.io instansiyasini app ga ulash
app.set('io', io)

// Serverni ishga tushirish
server.listen(PORT, () => {
	console.log(`🚀 Server ${PORT}-portda ishga tushdi`)
})
