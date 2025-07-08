// server/middleware/authMiddleware.js

export const protect = (req, res, next) => {
  // Dummy Auth Check
  const token = req.headers.authorization;

  if (!token || token !== "Bearer mytoken") {
    return res.status(401).json({ message: "Not authorized" });
  }

  // Fake user attach
  req.user = { id: "123", role: "admin" };
  next();
};

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role || 'guest'; // assuming req.user exists

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied." });
    }

    next();
  };
};