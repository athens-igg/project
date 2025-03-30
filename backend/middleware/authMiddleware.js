const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure correct path to User model
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("🔑 Received Token in Backend:", token); //   Debugging log

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("🔍 Decoded Token:", decoded); //   Debugging log

      req.user = await User.findById(decoded.id).select("-password");
      console.log("  Authenticated User:", req.user); //   Debugging log
      next(); // Proceed to protected route
    } catch (error) {
      console.error("Authorization error:", error.message);
      res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
    }
  } else {
    res.status(401).json({ message: "No token provided, authorization denied" });
  }
});

module.exports = { protect };