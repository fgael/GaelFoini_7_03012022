/* Import des modules necessaires */
const jwt = require("jsonwebtoken");

// Vérification de la présence du token
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Try again little Genius" });
  }

  // Vérifier la validité du token
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: "Bad token" });
    }
    // Stockage userId - role pour authentification route
    req.tokenId = jwt.verify(token, process.env.JWT_SECRET).id;
    req.role = jwt.verify(token, process.env.JWT_SECRET).role;
    next();
  });
};
