const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");
const userCtrl = require("../controllers/user.controller");
const multer = require("../middleware/multer-users.middleware");
const multerBanner = require("../middleware/multer-users-banner.middleware ");

//auth
router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);

//user DB
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.userInfo);
router.put("/:id", multer, userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);

//uploads
router.put(
  "/upload/profile-picture/:id",
  multer,
  userCtrl.uploadProfilePicture
);
router.put("/upload/banner/:id", multerBanner, userCtrl.uploadBanner);

module.exports = router;
