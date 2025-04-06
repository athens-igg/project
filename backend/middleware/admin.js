const verifyAdmin = (req, res, next) => {
    console.log("🛂 Admin Check - req.user:", req.user);
  
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Access denied. Admins only." });
    }
  };
  
  module.exports = { verifyAdmin };
  