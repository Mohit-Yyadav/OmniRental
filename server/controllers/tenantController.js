const Tenant = require('../models/Tenant');
const Property = require('../models/Property');
const MonthlyRecord = require('../models/MonthlyRecord');
const Payment = require("../models/Payment");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose"); 

// ✅ Get all tenants assigned to this owner
exports.getAllTenants = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const tenants = await Tenant.find({ owner: ownerId })
      .populate('tenantId', 'name email phone')
      .populate('property', 'name address');

    const formatted = tenants.map(t => {
  console.log('👀 tenantId Populated?', t.tenantId);
  return {
    id: t._id,
    name: t.tenantId?.name || 'N/A',
    email: t.tenantId?.email || '',
    phone: t.tenantId?.phone || '',
    rent: t.rent,
    roomNo: t.roomNo,
     members: t.members,
     meterNumber: t.meterNumber,       // ✅ add this
    pricePerUnit: t.pricePerUnit, 
    startDate: t.startDate,
    endDate: t.endDate,
    status: t.status,
    property: {
      name: t.property?.name,
      address: t.property?.address, // ✅ include address
    }
  };
});


    res.json(formatted);
  } catch (error) {
    console.error('❌ Error fetching tenants:', error);
    res.status(500).json({ error: 'Failed to fetch tenants' });
  }
};

// controllers/tenantController.js
exports.addTenant = async (req, res) => {
  try {
    console.log("📥 Incoming Payload:", req.body);
    console.log("👤 Authenticated User:", req.user);

    const {
      tenantId,
      propertyId,
      roomNo,
      members,
      rent,
      startDate,
      endDate,
      meterNumber,
      pricePerUnit,
    } = req.body;

    // Validate required fields (you can relax endDate if desired)
    if (!tenantId || !propertyId || !roomNo || !members || !rent || !startDate || !pricePerUnit) {
      console.log("⚠️ Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTenant = new Tenant({
      tenantId,
      owner: req.user._id,
      property: propertyId,
      roomNo,
      members: Number(members),
      rent: Number(rent),
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      meterNumber: Number(meterNumber) || 0,
      pricePerUnit: Number(pricePerUnit),
      status: "active",
    });

    console.log("🛠 Saving new tenant:", newTenant);
    await newTenant.save();

    // → IMPORTANT: keep property in sync
    try {
      await Property.findByIdAndUpdate(
        propertyId,
        { $set: { isBooked: true, status: "Occupied" } },
        { new: true }
      );
    } catch (propErr) {
      console.warn("⚠️ Could not update property status:", propErr);
      // don't fail whole request just because property update failed
    }

    res.status(201).json({ message: "Tenant added successfully", tenant: newTenant });
  } catch (error) {
    console.error("❌ Error adding tenant:", error);
    res.status(500).json({ error: error.message || "Failed to add tenant" });
  }
};



// ✅ Get monthly records of a tenant
exports.getMonthlyRecords = async (req, res) => {
  try {
    const tenantEntry = await Tenant.findById(req.params.tenantId);
    if (!tenantEntry) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    const tenantUserId = tenantEntry.tenantId; // 🔑 linked to MonthlyRecord.tenant
    const records = await MonthlyRecord.find({ tenant: tenantUserId }).sort({ month: -1 });

    res.json(records);
  } catch (error) {
    console.error("❌ Error fetching monthly records:", error);
    res.status(500).json({ error: "Failed to fetch monthly records" });
  }
};



// controllers/tenantController.js
// ✅ Generate monthly invoice for a tenant
exports.generateInvoice = async (req, res) => {
  try {
    const { tenantId: incomingTenantId, month, newMeterReading, extraCharges = 0 } = req.body;

    if (!incomingTenantId || !month) {
      return res.status(400).json({ error: "tenantId and month are required" });
    }

    // Load Tenant document
    const tenantDoc = await Tenant.findById(incomingTenantId);
    if (!tenantDoc) return res.status(404).json({ error: "Tenant not found" });

    const tenantUserId = tenantDoc.tenantId;
    if (!tenantUserId) return res.status(400).json({ error: "Tenant user id missing" });

    // Prevent duplicate invoice
    const existing = await MonthlyRecord.findOne({ tenant: tenantUserId, month });
    if (existing) return res.status(400).json({ error: "Invoice already exists for this month" });

    // Get previous reading
    const lastRecord = await MonthlyRecord.findOne({ tenant: tenantUserId }).sort({ month: -1 });
    const previousReading = lastRecord
      ? Number(lastRecord.newMeterReading || 0)
      : Number(tenantDoc.meterNumber || 0);

    const newReading = Number(newMeterReading);
    if (Number.isNaN(newReading)) return res.status(400).json({ error: "Invalid newMeterReading" });

    const extras = Number(extraCharges || 0);
    const unitRate = Number(tenantDoc.pricePerUnit || 0);
    const rent = Number(tenantDoc.rent || 0);

    const unitsConsumed = Math.max(0, newReading - previousReading);
    const electricityCharge = unitsConsumed * unitRate;
    const totalAmount = rent + electricityCharge + extras;

    // Get ownerId from the property
    const propertyDoc = await Property.findById(tenantDoc.property);
    if (!propertyDoc) return res.status(404).json({ error: "Property not found" });

    const ownerId = propertyDoc.owner;

    // Create MonthlyRecord
    const newRecord = new MonthlyRecord({
      tenant: tenantUserId,
      property: tenantDoc.property,
      ownerId,              // ✅ Add ownerId
      month,
      rent,
      previousReading,
      newMeterReading: newReading,
      meterUnits: unitsConsumed,
      pricePerUnit: unitRate,
      extraCharges: extras,
      electricityCharge,
      totalAmount,
      isPaid: false,
    });

    await newRecord.save();

    return res.status(201).json({
      id: newRecord._id,
      month,
      rentAmount: rent,
      previousReading,
      newMeterReading: newReading,
      unitsConsumed,
      pricePerUnit: unitRate,
      electricityCharge,
      extraCharges: extras,
      totalAmount,
      status: "pending",
      ownerId, // ✅ return ownerId
    });

  } catch (err) {
    console.error("❌ Generate Invoice Error:", err);
    res.status(500).json({ error: "Failed to generate invoice" });
  }
};






// ✅ Get rental history for current logged-in tenant
exports.getMyHistory = async (req, res) => {
  try {
    const tenantUserId = req.user._id; // Authenticated user's _id

    const history = await Tenant.find({ tenantId: tenantUserId })
      .populate('property', 'name address') // so frontend can use property.name
      .sort({ startDate: -1 });

    res.json(history);
  } catch (err) {
    console.error("❌ Failed to fetch rental history:", err);
    res.status(500).json({ error: "Failed to fetch rental history" });
  }
};


// ✅ Get all invoices for the logged-in tenant
exports.getMyInvoices = async (req, res) => {
  try {
    const tenantId = req.user._id;
 console.log("🔐 Authenticated Tenant ID:", tenantId);
   const invoices = await MonthlyRecord.find({ tenant: tenantId })
  .populate('property', 'name')
  .populate('tenant', '_id')
  .sort({ month: -1 });


   const formatted = invoices.map((inv) => ({
  ...inv.toObject(),
  meterUnits: inv.meterUnits ?? 0,
  electricityCharge: inv.electricityCharge ?? 0,
  extraCharges: inv.extraCharges ?? 0,
  totalAmount: inv.totalAmount ?? 0,
  rent: inv.rent ?? 0,
  month: inv.month || '',
  isPaid: inv.isPaid ?? false,
  property: inv.property || { name: 'N/A' },
}));


    res.status(200).json(formatted);
  } catch (err) {
    console.error('❌ getMyInvoices error:', err);
    res.status(500).json({ message: 'Failed to fetch invoices' });
  }
};


// Get property assigned to a specific tenant
// tenantController.js
exports.getTenantProperty = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ tenantId: req.user._id }).lean();
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    const property = await Property.findById(tenant.property).lean();
    if (!property) return res.status(404).json({ message: "Property not found" });

    res.json({ tenant, property });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch property" });
  }
};




