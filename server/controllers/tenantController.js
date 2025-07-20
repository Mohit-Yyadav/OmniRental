const Tenant = require('../models/Tenant');
const Property = require('../models/Property');
const MonthlyRecord = require('../models/MonthlyRecord');

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

    if (!tenantId || !propertyId || !roomNo || !members || !rent || !startDate || !endDate || !pricePerUnit) {
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
      endDate: new Date(endDate),
      meterNumber: Number(meterNumber) || 0,
      pricePerUnit: Number(pricePerUnit),
      status: "active",
    });

    console.log("🛠 Saving new tenant:", newTenant);

    await newTenant.save();

    res.status(201).json({ message: "Tenant added successfully", tenant: newTenant });
  } catch (error) {
    console.error("❌ Error adding tenant:", error);
    res.status(500).json({ error: error.message || "Failed to add tenant" });
  }
};






// ✅ Get monthly records of a tenant
exports.getMonthlyRecords = async (req, res) => {
  const tenantId = req.params.tenantId;
  const records = await MonthlyRecord.find({ tenant: tenantId });
  res.json(records);
};


// ✅ Generate invoice for current month
exports.generateInvoice = async (req, res) => {
  try {
    console.log("📥 Invoice Request Body:", req.body);

    const { tenantId, month, newMeterReading, extraCharges = 0 } = req.body;

    const tenant = await Tenant.findById(tenantId);
    if (!tenant) return res.status(404).json({ error: "Tenant not found" });

    const existing = await MonthlyRecord.findOne({ tenant: tenantId, month });
    if (existing) {
      console.log("⚠️ Invoice already exists:", existing);
      return res.status(400).json({ error: "Invoice already exists for this month" });
    }

    const lastRecord = await MonthlyRecord.findOne({ tenant: tenantId }).sort({ month: -1 });

    const previousReading = lastRecord
      ? lastRecord.newMeterReading
      : parseInt(tenant.meterNumber);

    const unitsConsumed = newMeterReading - previousReading;

    console.log("📊 Readings:", {
      previousReading,
      newMeterReading,
      unitsConsumed,
    });

    if (unitsConsumed < 0) {
      return res.status(400).json({ error: "New meter reading cannot be less than previous reading" });
    }

    const electricityCharge = unitsConsumed * tenant.pricePerUnit;
    const totalAmount = tenant.rent + electricityCharge + extraCharges;

    const newRecord = new MonthlyRecord({
      tenant: tenantId,
      property: tenant.property,
      month,
      rent: tenant.rent,
      previousReading,
      newMeterReading,
      meterUnits: unitsConsumed,
      pricePerUnit: tenant.pricePerUnit,
      extraCharges,
      totalAmount,
      isPaid: false,
    });

    await newRecord.save();

    res.status(200).json({
      id: newRecord._id,
      month,
      rentAmount: tenant.rent,
      previousReading,
      newMeterReading,
      unitsConsumed,
      pricePerUnit: tenant.pricePerUnit,
      electricityCharge,
      extraCharges,
      totalAmount,
      status: "pending",
    });
  } catch (err) {
    console.error("❌ Generate Invoice Error:", err);
    res.status(500).json({ error: "Failed to generate invoice" });
  }
};


