const BookingRequest = require('../models/BookingRequest');
const Property = require('../models/Property');

const createBookingRequest = async (req, res) => {
  try {
    const { propertyId, moveInDate, duration, occupation, additionalInfo } = req.body;

    // 1. Validate required fields
    if (!propertyId || !moveInDate || !duration) {
      return res.status(400).json({ message: 'Required fields missing.' });
    }

    // 2. Find the property
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    // 3. Prevent duplicate request from same tenant on same property
    const existingRequest = await BookingRequest.findOne({
      property: propertyId,
      tenant: req.user._id,
      status: { $in: ['Pending', 'Accepted'] }
    });

    if (existingRequest) {
      return res.status(409).json({ message: 'You have already sent a booking request for this property.' });
    }

    // 4. Create booking
    const booking = await BookingRequest.create({
      property: propertyId,
      tenant: req.user._id,
      owner: property.owner,
      moveInDate,
      duration,
      occupation,
      additionalInfo
    });

    res.status(201).json({ message: 'Booking request submitted successfully.', booking });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Error creating booking request. Please try again later.' });
  }
};

module.exports = {
  createBookingRequest
};
