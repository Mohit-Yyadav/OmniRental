const Tenant = require('../models/Tenant');
const Property = require('../models/Property');

exports.addTenantToProperty = async (req, res) => {
  try {
    const {
      tenantId,
      propertyId,
      roomNo,
      members,
      rent,
      startDate,
      endDate,
      meterNumber,
      pricePerUnit
    } = req.body;

    // You should add validation and saving logic here

    res.status(200).json({ message: 'Tenant added successfully (placeholder)' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
