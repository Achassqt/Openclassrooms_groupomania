const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");
const userCtrl = require("../controllers/user.controller");

//auth
router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);

//user DB
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.userInfo);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
