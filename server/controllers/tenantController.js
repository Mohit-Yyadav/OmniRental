import Tenant from '../models/Tenant.js';

 import Application from '../models/Application.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new tenant
// @route   POST /api/tenants/register
// @access  Public
export const registerTenant = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  const tenantExists = await Tenant.findOne({ email });

  if (tenantExists) {
    res.status(400);
    throw new Error('Tenant already exists');
  }

  const tenant = await Tenant.create({
    name,
    email,
    password,
    phone
  });

  if (tenant) {
    res.status(201).json({
      _id: tenant._id,
      name: tenant.name,
      email: tenant.email,
      token: generateToken(tenant._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid tenant data');
  }
});

// @desc    Authenticate tenant & get token
// @route   POST /api/tenants/login
// @access  Public
export const loginTenant = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const tenant = await Tenant.findOne({ email });

  if (tenant && (await tenant.matchPassword(password))) {
    res.json({
      _id: tenant._id,
      name: tenant.name,
      email: tenant.email,
      token: generateToken(tenant._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get tenant profile
// @route   GET /api/tenants/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.tenant._id).select('-password');
  
  if (!tenant) {
    res.status(404);
    throw new Error('Tenant not found');
  }
  
  res.json(tenant);
});

// @desc    Update tenant profile
// @route   PUT /api/tenants/update
// @access  Private
export const updateTenant = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.tenant._id);

  if (tenant) {
    tenant.name = req.body.name || tenant.name;
    tenant.email = req.body.email || tenant.email;
    tenant.phone = req.body.phone || tenant.phone;
    tenant.photo = req.body.photo || tenant.photo;
    tenant.documents = req.body.documents || tenant.documents;
    
    if (req.body.location) {
      tenant.location = req.body.location;
    }

    if (req.body.password) {
      tenant.password = req.body.password;
    }

    const updatedTenant = await tenant.save();

    res.json({
      _id: updatedTenant._id,
      name: updatedTenant.name,
      email: updatedTenant.email,
      photo: updatedTenant.photo
    });
  } else {
    res.status(404);
    throw new Error('Tenant not found');
  }
});

// @desc    Get tenant's rental history
// @route   GET /api/tenants/history
// @access  Private
export const getRentalHistory = asyncHandler(async (req, res) => {
  const applications = await Application.find({ tenant: req.tenant._id })
    .populate('tender', 'title pricePerDay location')
    .sort('-createdAt');

  res.json(applications);
});

// @desc    Apply for a rental
// @route   POST /api/tenants/apply/:tenderId
// @access  Private
export const applyForRental = asyncHandler(async (req, res) => {
  const { startDate, endDate, message } = req.body;
  const tender = await Tender.findById(req.params.tenderId);

  if (!tender) {
    res.status(404);
    throw new Error('Tender not found');
  }

  const existingApplications = await Application.find({
    tender: tender._id,
    $or: [
      { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
    ],
    status: { $in: ['pending', 'approved'] }
  });

  if (existingApplications.length > 0) {
    res.status(400);
    throw new Error('Selected dates are not available');
  }

  const application = await Application.create({
    tender: tender._id,
    tenant: req.tenant._id,
    startDate,
    endDate,
    message,
    status: 'pending'
  });

  res.status(201).json(application);
});
