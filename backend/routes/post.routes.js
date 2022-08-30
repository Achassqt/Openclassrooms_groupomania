const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const multer = require("../middleware/multer-posts.middleware");
const { checkUser } = require("../middleware/auth.middleware");

// posts
router.post("/", checkUser, multer, postCtrl.createPost);
router.get("/", postCtrl.readPost);
router.put("/:id", checkUser, multer, postCtrl.updatePost);
router.delete("/:id", checkUser, postCtrl.deletePost);
router.patch("/like/:id", postCtrl.likes);
router.patch("/unlike/:id", postCtrl.unlikes);

// commentaires
router.patch("/comment/:id", checkUser, postCtrl.commentPost);
router.patch("/delete-comment/:id", checkUser, postCtrl.deleteCommentPost);

module.exports = router;
