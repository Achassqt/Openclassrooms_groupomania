const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { signupErrors, loginErrors } = require("../utils/errors.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

exports.signup = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await User.create({
      pseudo,
      email,
      password,
      imageUrl: `${req.protocol}://${req.get(
        "host"
      )}/uploads/images/profil/random-user.png`,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    console.log(err);
    const errors = signupErrors(err);
    res.status(200).send({ errors });
    // res.status(200).send(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    console.log(err);
    const errors = loginErrors(err);
    res.status(200).send({ errors });
  }
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
