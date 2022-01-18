/* Import des modules necessaires */
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Vérification de la présence du token
module.exports = (req, res, next) => {
  if (req.role === 0) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
