export const applyForRental = async (req, res) => {
  try {
    const { propertyId, tenantDetails } = req.body;
    // Your business logic
    res.status(201).json({ 
      success: true,
      message: "Application submitted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};