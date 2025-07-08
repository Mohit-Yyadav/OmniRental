// server/controllers/propertyController.js
import Property from '../models/Property.js'; // Required for deleteProperty to work

// ✅ Get all properties
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to get properties", error });
  }
};

// ✅ Get property by ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch property", error });
  }
};

// ✅ Create new property
export const createProperty = async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: "Failed to create property", error });
  }
};

// ✅ Delete property
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Property.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// ✅ Update property
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProperty = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update property', error });
  }
};