const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const multer = require("../middleware/multer-posts.middleware");
// const multer = require("multer");

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: "uploads/images/posts",
//     filename: function (req, res, callback) {
//       callback(null, `${Date.now()}-${originalname}`);
//     },
//   }),
// });

router.post("/", multer, postCtrl.createPost);
router.get("/", postCtrl.readPost);
router.put("/:id", multer, postCtrl.updatePost);
router.delete("/:id", postCtrl.deletePost);
router.patch("/like/:id", postCtrl.likes);
router.patch("/unlike/:id", postCtrl.unlikes);

// commentaires
router.patch("/comment/:id", postCtrl.commentPost);
router.patch("/edit-comment/:id", postCtrl.editCommentPost);
router.patch("/delete-comment/:id", postCtrl.deleteCommentPost);

module.exports = router;
