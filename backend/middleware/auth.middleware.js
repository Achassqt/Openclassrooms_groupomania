const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        console.log(user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json("no token");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("no token");
  }
};
