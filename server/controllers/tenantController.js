const Tenant = require('../models/Tenant');

exports.getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find().populate('property');
    res.status(200).json(tenants);
  } catch (err) {
    console.error('Error fetching tenants:', err);
    res.status(500).json({ error: 'Failed to fetch tenants' });
  }
};
