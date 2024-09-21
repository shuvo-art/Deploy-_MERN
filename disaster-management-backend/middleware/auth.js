const jwt = require("jsonwebtoken");

// Middleware to authenticate user based on JWT token
exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is missing" });
    }

    // Verify the token using JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      // Save the decoded token info to req.user
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during authentication" });
  }
};

// Middleware to authorize user roles (e.g., "admin")
exports.authorize = (roles) => {
  return (req, res, next) => {
    // Check if the user has one of the allowed roles
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({
          message: "You do not have permission to access this resource",
        });
    }
    next();
  };
};
