/* Import des modules necessaires */
const db = require("../db.config");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* Controleur création utilisateur */
exports.signup = async (req, res, next) => {
  const { nom, prenom, pseudo, email, password } = req.body;
  req.body.secret_key !== process.env.SECRET_KEY
    ? (req.body.role = false)
    : (req.body.role = true);
  // Validation des données reçues
  if (!nom || !prenom || !pseudo || !email || !password) {
    return res.status(400).json({ message: "Missing Data" });
  }
  try {
    // Vérification si l'utilisateur existe déjà
    let user = await User.findOne({ where: { email: email }, raw: true });
    if (user !== null) {
      return res
        .status(409)
        .json({ message: `The user ${nom} already exists !` });
    }
    // Hashage du mot de passe utilisateur
    let hash = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUND)
    );
    req.body.password = hash;
    // Création de l'utilisateur
    let newUser = await User.create(req.body);
    return res.json({ message: "User Created", data: newUser });
  } catch (err) {
    if (err.name == "SequelizeDatabaseError") {
      res.status(500).json({ message: "Database Error", error: err });
    }
    res.status(500).json({ message: "Hash Process Error", error: err });
  }
};

/* Controleur login utilisateur */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // Validation des données reçues
  if (!email || !password) {
    return res.status(400).json({ message: "Bad email or password" });
  }
  try {
    // Vérification si l'utilisateur existe
    let user = await User.findOne({ where: { email: email }, raw: true });
    if (user === null) {
      return res
        .status(401)
        .json({ message: "This account does not exists !" });
    }
    // Vérification du mot de passe
    let test = await bcrypt.compare(password, user.password);
    if (!test) {
      return res.status(401).json({ message: "Wrong password" });
    }
    // Génération du token et envoi
    const token = jwt.sign(
      {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_DURING }
    );
  
    const refreshToken = jwt.sign(
      {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_DURINGREFRESH }
    );
    const tokens = {
      access_token: token,
      refresh_token: refreshToken,
    }
    return res.json({ userTokens: tokens, userInfos: user });
  } catch (err) {
    if (err.name == "SequelizeDatabaseError") {
      res.status(500).json({ message: "Database Error", error: err });
    }
    res.status(500).json({ message: "Login process failed", error: err });
  }
};

/* Controleur refresh token */
exports.refresh = (req, res, next) => {
  User.findOne({ where: { id: req.params.id }, raw: true })
    .then((user) => {
      res.status(200).json({
        id: user.id,
        token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_DURING,
        }),
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

/* Controleur display all users */
exports.getAllAccounts = (req, res, next) => {
  User.findAll()
    .then((users) => res.json({ data: users }))
    .catch((err) => res.status(500).json({ message: "Database Error" }));
};

/* Controleur display one user */
exports.getOneAccount = async (req, res, next) => {
  let userId = parseInt(req.params.id);
  // Vérification si le champ id est présent et cohérent
  if (!userId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }
  // Récupération de l'utilisateur
  try {
    let user = await User.findOne({ where: { id: userId }, raw: true });
    if (user === null) {
      return res.status(404).json({ message: "This user does noe exist !" });
    }
    // Utilisateur trouvé
    return res.json({ data: user });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

/* Controleur modification utilisateur */
exports.updateAccount = async (req, res, next) => {
  let userId = parseInt(req.params.id);
  // Vérification si le champ id est présent et cohérent
  if (!userId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }

  try {
    // Recherche de l'utilisateur et vérification
    let user = await User.findOne({ where: { id: userId }, raw: true });
    if (req.tokenId !== user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Vérifier si l'utilisateur existe
    if (user === null) {
      return res.status(404).json({ message: "This user does not exist !" });
    }
    // Mise à jour de l'utilisateur
    await User.update(req.body, { where: { id: userId } });
    return res.json({ message: "User updated" });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

/* Controleur suppression utilisateur de la BDD */
exports.deleteAccount = (req, res, next) => {
  let userId = parseInt(req.params.id);
  // Vérification si le champ id est présent et cohérent
  if (!userId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }
  User.findOne({ where: { id: userId }, raw: true })
    .then((user) => {
      if (req.tokenId !== user.id || req.role === 1) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      // Suppression de l'utilisateur
      User.destroy({ where: { id: userId }, force: true })
        .then(() => res.status(204).json({}))
        .catch((err) =>
          res.status(500).json({ message: "Database Error", error: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

/* Controleur suppression utilisateur en le gardant dans la BDD */
exports.trashAccount = (req, res, next) => {
  let userId = parseInt(req.params.id);
  // Vérification si le champ id est présent et cohérent
  if (!userId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }
  User.findOne({ where: { id: userId }, raw: true })
    .then((user) => {
      if (req.tokenId !== user.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      // Suppression de l'utilisateur
      User.destroy({ where: { id: userId } })
        .then(() => res.status(204).json({}))
        .catch((err) =>
          res.status(500).json({ message: "Database Error", error: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

// Recupération utilisateur soft delete
exports.untrashAccount = (req, res, next) => {
  let userId = parseInt(req.params.id);
  // Vérification si le champ id est présent et cohérent
  if (!userId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }
  User.findOne({ where: { id: userId }, raw: true })
    .then((user) => {
      if (req.tokenId !== user.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      User.restore({ where: { id: userId } })
        .then(() => res.status(204).json({}))
        .catch((err) =>
          res.status(500).json({ message: "Database Error", error: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};
