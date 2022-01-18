/* Import des modules necessaires */
const jwt = require("jsonwebtoken");

// Extraction du token
const extractBearer = (authorization) => {
  if (typeof authorization !== "string") {
    return false;
  }
  // Isolation du token
  const matches = authorization.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

// Vérification de la présence du token
module.exports = (req, res, next) => {
  const token =
    req.headers.authorization && extractBearer(req.headers.authorization);

  if (!token) {
    return res.status(401).json({ message: "Try again little Genius" });
  }

  // Stockage userId du token
  req.tokenId = jwt.verify(token, process.env.JWT_SECRET).id;
  req.role = jwt.verify(token, process.env.JWT_SECRET).role;

  // Vérifier la validité du token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Bad token" });
    }

    next();
  });
};
