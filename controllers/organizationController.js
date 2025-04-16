// controllers/organizationController.js

const Organization = require('../models/Organization');

// Tashkilot qo‘shish (Admin uchun)
exports.addOrganization = async (req, res) => {
  const { name, location, services, schedule, phoneNumber, email, website } = req.body;

  try {
    const organization = new Organization({
      name,
      location,
      services,
      schedule,
      phoneNumber,
      email,
      website,
    });
    await organization.save();
    res.status(201).json(organization);
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi', error: error.message });
  }
};

// Barcha tashkilotlarni olish
exports.getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi', error: error.message });
  }
};
