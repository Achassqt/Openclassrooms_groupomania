const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
};

exports.userInfo = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  User.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Id unknown : " + err);
  }).select("-password");
};

exports.updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          pseudo: req.body.pseudo,
          email: req.body.email,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
      //erreur console postman avec ma version de mongodb
      // (err, docs) => {
      //   if (!err) return res.send(docs);
      //   else return res.status(500).send({ message: err });
      // }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await User.deleteOne({ _id: req.params.id });
    return res.status(200).json({ message: "User deleted." });
  } catch (err) {
    return res.status(500).json({ massage: err });
  }
};
