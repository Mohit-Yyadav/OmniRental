const Booking = require('../models/BookingRequest'); // ✅ Add this
// other models...
const Tenant = require('../models/Tenant');
const Payment = require('../models/Payment');
const Property = require('../models/Property');
const User = require('../models/User');
const MonthlyRecord = require('../models/MonthlyRecord');



// ✅ Add a new tenant to property after deposit
exports.addTenantToProperty = async (req, res) => {
  try {
    const {
      tenantId,
      propertyId,
      room,
      members,
      rent,
      startDate,
      endDate,
      meterNumber,
      pricePerUnit
    } = req.body;

    // Check if tenant exists and deposit paid
    const deposit = await Payment.findOne({
      tenantId,
      propertyId,
      paymentType: 'deposit',
      status: 'paid'
    });

    if (!deposit) {
      return res.status(400).json({ message: 'Deposit not found or not paid.' });
    }

    // Create a new Tenant document
    const tenant = new Tenant({
      tenantId,
      propertyId,
      roomNo: room,
      members,
      rent,
      leaseStart: startDate,
      leaseEnd: endDate,
      meterNumber,
      pricePerUnit
    });

    await tenant.save();

    res.status(201).json({ message: 'Tenant added successfully', tenant });
  } catch (error) {
    console.error('Error in addTenantToProperty:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Get all deposited tenants
exports.getDepositedTenants = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const deposits = await Payment.find({
      ownerId,
      paymentType: 'deposit',
      status: 'paid'
    })
      .populate('tenantId')
      .populate({
        path: 'propertyId',
        select: 'name address roomNo', // ✅ include rooms
      });

    const formatted = deposits.map((deposit) => ({
      id: deposit._id,
      tenantId: deposit.tenantId._id,
      name: deposit.tenantId?.name,
      email: deposit.tenantId?.email,
      phone: deposit.tenantId?.phone,
      depositAmount: deposit.amount,
      depositDate: deposit.date,
      property: {
        _id: deposit.propertyId?._id,
        name: deposit.propertyId?.name,
        address: deposit.propertyId?.address,
        roomNo: [deposit.propertyId?.roomNo], // ✅ include rooms here
      }
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch deposited tenants" });
  }
};


