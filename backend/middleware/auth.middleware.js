const jwt = require("jsonwebtoken");
const User = require("../models/User");

//vérification du token et retourne les infos du user dans res.locals.user
exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        // res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await User.findById(decodedToken.userId);
        res.locals.user = user;
        // console.log(user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

//vérification du token et retourne userRole et userId
exports.getToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      // const userId = decodedToken.userId;
      // const userRole = decodedToken.userRole;
      if (err) {
        // console.log(err);
        res.send(200).json("no token");
      } else {
        // console.log({ userId, userRole });
        next();
      }
    });
  } else {
    console.log("no token");
  }
};
