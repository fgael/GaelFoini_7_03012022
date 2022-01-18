/* Import des modules necessaires */
const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controllers");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const multer = require("../middleware/multer-config");

/* Routage Post */
router.get("", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("", auth, multer, postCtrl.createPost);
router.patch("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);
router.delete("/trash/:id", auth, admin, postCtrl.trashPost);
router.post("/untrash/:id", auth, admin, postCtrl.untrashPost);
router.put("/comment", auth, postCtrl.createComment);
router.put("/comment", auth, postCtrl.updateComment);
router.delete("/comment/:id", auth, postCtrl.deleteComment);
router.delete("/comment/trash/:id", auth, admin, postCtrl.trashComment);
router.post("/comment/untrash/:id", auth, admin, postCtrl.untrashComment);

module.exports = router;
