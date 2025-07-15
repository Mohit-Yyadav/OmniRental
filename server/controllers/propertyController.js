const Property = require('../models/Property');

// @desc   Add new property
// @route  POST /api/properties
// @access Private (Owner)
const addProperty = async (req, res) => {
  try {
    const {
      name, address, rent, type, furnished,
      sharing, description, amenities, location, roomNo
    } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // ✅ Get uploaded filenames from req.files
    const imagePaths = (req.files || []).map(file => file.filename); // Or `file.path` if full path needed

    const newProperty = new Property({
      owner: req.user._id,
      roomNo,
      name,
      address,
      rent,
      type,
      furnished,
      sharing,
      description,
      amenities,
      location,
      images: imagePaths, // ✅ Save filenames to DB
    });

    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error('❌ Add Property Error:', error);
    res.status(500).json({ message: error.message });
  }
};


// @desc   Get all properties for the logged-in owner
// @route  GET /api/properties
// @access Private
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    console.error('❌ Get Properties Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single property by ID
// @route  GET /api/properties/:id
// @access Private
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.json(property);
  } catch (error) {
    console.error('❌ Get Property Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update property
// @route  PUT /api/properties/:id
// @access Private
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized update' });
    }

    // ✅ Collect updated fields
    const {
      roomNo,
      name,
      address,
      rent,
      type,
      furnished,
      sharing,
      description,
      amenities,
      location,
    } = req.body;

    // ✅ Add new uploaded files if any
    const newImages = req.files?.map((file) => file.filename) || [];

    // ✅ Update fields
    property.roomNo = roomNo || property.roomNo;
    property.name = name || property.name;
    property.address = address || property.address;
    property.rent = rent || property.rent;
    property.type = type || property.type;
    property.furnished = furnished || property.furnished;
    property.sharing = sharing || property.sharing;
    property.description = description || property.description;
    property.amenities = amenities || property.amenities;
    property.location = location || property.location;

    if (newImages.length > 0) {
      property.images = newImages;
    }

    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } catch (error) {
    console.error('❌ Update Property Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};


// @desc   Delete property
// @route  DELETE /api/properties/:id
// @access Private
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🧨 DELETE request for ID:', id);

    const property = await Property.findById(id);

    if (!property) {
      console.log('❌ Property not found');
      return res.status(404).json({ message: 'Property not found' });
    }

    // ✅ FIXED: Use req.user._id instead of req.user.userId
    if (property.owner.toString() !== req.user._id.toString()) {
      console.log('🚫 Unauthorized. Property owner:', property.owner, 'User:', req.user._id);
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Property.deleteOne({ _id: id });
    console.log('✅ Property deleted successfully');
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('❌ Server Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


// @desc   Get public properties (no auth)
// @route  GET /api/properties/public
// @access Public
const getPublicProperties = async (req, res) => {
  try {
    const properties = await Property.find({ status: 'Vacant' }).sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    console.error('❌ Public Get Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single property (public)
// @route  GET /api/properties/public/:id
// @access Public
const getPublicPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error('❌ Public Property Detail Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports = {
  addProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getPublicProperties,
  getPublicPropertyById, // ✅ Newly added
};

