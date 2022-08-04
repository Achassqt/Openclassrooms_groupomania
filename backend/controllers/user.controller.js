const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");

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
          // email: req.body.email,
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

exports.uploadProfilePicture = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      // suppresion de l'ancienne image
      const filename = user.imageUrl.split("/uploads/images/profil/")[1];
      if (req.file && filename !== "random-user.png") {
        fs.unlink(`uploads/images/profil/${filename}`, (err) => {
          if (err) {
            throw err;
          }
        });
      }

      // mise à jour de la nouvelle photo
      if (req.params.id) {
        User.updateOne(
          { _id: req.params.id },
          {
            $set: {
              imageUrl: `${req.protocol}://${req.get(
                "host"
              )}/uploads/images/profil/${req.file.filename}`,
            },
          }
        )
          .then(() => res.status(200).json({ message: "Photo modifiée!" }))
          .catch((err) => res.status(400).json({ err }));
      } else {
        res.status(401).json({ error: "Non autorisé" });
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

exports.uploadBanner = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      // suppresion de l'ancienne image
      if (user.banner) {
        const filename = user.banner.split("/uploads/images/profil/banner/")[1];
        fs.unlink(`uploads/images/profil/banner/${filename}`, (err) => {
          if (err) {
            throw err;
          }
        });
      }

      // mise à jour de la nouvelle photo
      if (req.params.id) {
        User.updateOne(
          { _id: req.params.id },
          {
            $set: {
              banner: `${req.protocol}://${req.get(
                "host"
              )}/uploads/images/profil/banner/${req.file.filename}`,
            },
          }
        )
          .then(() => res.status(200).json({ message: "Bannière modifiée!" }))
          .catch((err) => res.status(400).json({ err }));
      } else {
        res.status(401).json({ err: "Non autorisé" });
      }
    })
    .catch((err) => res.status(500).json({ err }));
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
