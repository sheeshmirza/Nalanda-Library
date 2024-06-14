const jwt = require("jsonwebtoken");

const auth = (role) => {
  return (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied, no token provided" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (role && req.user.role !== role) {
        return res
          .status(403)
          .json({ error: "Access denied, insufficient permissions" });
      }
      next();
    } catch (err) {
      res.status(400).json({ error: "Invalid token" });
    }
  };
};

module.exports = auth;
