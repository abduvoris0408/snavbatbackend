// controllers/userController.js

const User = require('../models/user') // To'g'ri yo'l
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Foydalanuvchi ro‘yxatdan o‘tishi
exports.register = async (req, res) => {
	const { name, email, password } = req.body

	try {
		const userExists = await User.findOne({ email })
		if (userExists)
			return res
				.status(400)
				.json({ message: 'Email allaqachon ro‘yxatdan o‘tgan' })

		const user = new User({ name, email, password })
		await user.save()
		res.status(201).json({ message: 'Foydalanuvchi yaratildi' })
	} catch (error) {
		res.status(500).json({
			message: 'Xatolik yuz berdi',
			error: error.message,
		})
	}
}

// Foydalanuvchi login
exports.login = async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await User.findOne({ email })
		if (!user)
			return res.status(400).json({ message: 'Foydalanuvchi topilmadi' })

		const isMatch = await user.matchPassword(password)
		if (!isMatch)
			return res.status(400).json({ message: 'Noto‘g‘ri parol' })

		const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' })
		res.json({ token })
	} catch (error) {
		res.status(500).json({
			message: 'Xatolik yuz berdi',
			error: error.message,
		})
	}
}

// Foydalanuvchi ma'lumotlarini olish
exports.getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id)
		if (!user)
			return res.status(400).json({ message: 'Foydalanuvchi topilmadi' })

		res.json(user)
	} catch (error) {
		res.status(500).json({
			message: 'Xatolik yuz berdi',
			error: error.message,
		})
	}
}
