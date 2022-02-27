/* Import des modules necessaires */
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controllers");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const multer = require("../middleware/multer-config");

/* Routage User */
router.put("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/refresh", userCtrl.refresh);
router.get("/accounts/", auth, admin, userCtrl.getAllAccounts);
router.get("/accounts/:id", auth, userCtrl.getOneAccount);
router.patch("/accounts/:id", auth, multer, userCtrl.updateAccount);
router.patch("/accounts/role/:id", auth, admin, userCtrl.updateRole);
router.delete("/accounts/trash/:id", auth, admin, userCtrl.trashAccount);
router.post("/accounts/untrash/:id", auth, admin, userCtrl.untrashAccount);
router.delete("/accounts/:id", auth, userCtrl.deleteAccount);

module.exports = router;
