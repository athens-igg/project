const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user and attach to req (excluding password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next(); // Proceed to protected route
  } catch (error) {
    console.error("Authorization Error:", error.message);
    res
      .status(401)
      .json({ message: "Unauthorized - Invalid or expired token" });
  }
});

module.exports = { protect };
