// config/db.js
const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
    console.dir(process.env.MONGO_URI)
		console.log(`✅ MongoDB ulandi: ${conn.connection.host}`)
	} catch (error) {
    console.log(error);
    
		console.error('❌ MongoDB ulanishda xatolik:', error.message)
		process.exit(1)
	}
}

module.exports = connectDB
