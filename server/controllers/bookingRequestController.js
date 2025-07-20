const BookingRequest = require("../models/BookingRequest");
const Property = require("../models/Property");
const User = require("../models/User");

exports.createBookingRequest = async (req, res) => {
  try {
    console.log("📥 Incoming request body:", req.body);
    console.log("🔐 Logged-in user:", req.user);

    const { propertyId, moveInDate, duration, occupation, additionalInfo ,
  numPersons,
  rent, } =
      req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      console.log("❌ Property not found");
      return res.status(404).json({ message: "Property not found" });
    }

    if (!req.user || req.user.role !== "tenant") {
      console.log("❌ Unauthorized: Only tenants can book");
      return res
        .status(403)
        .json({ message: "Only tenants can send booking requests" });
    }

    const booking = new BookingRequest({
      propertyId,
      tenantId: req.user._id,
      ownerId: property.owner,
      moveInDate,
      duration,
      occupation,
      additionalInfo,
      numPersons,
      rent,
    });

    await booking.save();

    console.log("✅ Booking request saved successfully:", booking);
    res.status(201).json(booking);
  } catch (error) {
    console.error("❌ Error in createBookingRequest:", error);
    res.status(500).json({ message: "Failed to create booking request" });
  }
};

// ✅ Tenant fetches their requests
exports.getRequestsForTenant = async (req, res) => {
  try {
    const tenantId = req.user._id;

    const requests = await BookingRequest.find({ tenantId })
      .populate({
        path: "propertyId",
        select: "name address roomNo owner",
        populate: {
          path: "owner",
          model: "User",
          select: "name"
        }
      })
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (err) {
    console.error("❌ Error in getRequestsForTenant:", err);
    res.status(500).json({ message: "Failed to fetch booking requests." });
  }
};



// ✅ Owner fetches requests for their properties
exports.getRequestsForOwner = async (req, res) => {
  try {
    const bookings = await BookingRequest.find({ ownerId: req.user._id })
.populate("propertyId", "name address roomNo ")
      .populate("tenantId", "-password -__v") // exclude sensitive fields only
    
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("❌ Error fetching owner requests:", error);
    res.status(500).json({ message: "Failed to fetch booking requests" });
  }
};

// ✅ Owner updates status (approve/reject)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await BookingRequest.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking request not found" });
    }

    if (booking.ownerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this request" });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: "Booking request updated", booking });
  } catch (error) {
    console.error("❌ Error updating status:", error);
    res.status(500).json({ message: "Failed to update booking request" });
  }
};
