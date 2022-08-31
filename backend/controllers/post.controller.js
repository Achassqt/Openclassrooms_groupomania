const Post = require("../models/Post");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");

exports.createPost = async (req, res) => {
  const newPost = new Post(
    req.file
      ? {
          ...req.body,
          imageUrl: `${req.protocol}://${req.get(
            "host"
          )}/uploads/images/posts/${req.file.filename}`,
        }
      : {
          posterId: req.body.posterId,
          message: req.body.message,
          likers: [],
          comments: [],
        }
  );

  // vérification utilisateur
  if (
    res.locals.user === null ||
    res.locals.user._id.valueOf() !== newPost.posterId
  ) {
    return res.status(401).json({ error: "Non autorisé" });
  }

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.readPost = (req, res) => {
  Post.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

exports.updatePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id unknown : " + req.params.id);

  // si le post contient une image et que la req aussi, suppression l'ancienne image
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      // if (req.file && post.imageUrl !== undefined) {
      //   const filename = post.imageUrl.split("/uploads/images/posts/")[1];
      //   fs.unlink(`uploads/images/posts/${filename}`, (err) => {
      //     if (err) {
      //       throw err;
      //     }
      //   });
      // }

      const postObject =
        // req.file
        //   ? {
        //       ...req.body,
        //       imageUrl: `${req.protocol}://${req.get(
        //         "host"
        //       )}/uploads/images/posts/${req.file.filename}`,
        //     }
        //   :
        { ...req.body };

      console.log(res.locals.user.role);
      // Mise à jour du post
      if (
        post.posterId === res.locals.user._id.valueOf() ||
        res.locals.user.role === "admin"
      ) {
        Post.findOneAndUpdate(
          { _id: req.params.id },
          { $set: { ...postObject } },
          { new: true }
        )
          .then((post) => res.status(200).json(post))
          .catch((err) => res.status(400).json({ err }));
      } else {
        res.status(401).json({ error: "Non autorisé" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

exports.deletePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id unknown : " + req.params.id);

  console.log(res.locals.user);

  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (
        post.posterId === res.locals.user._id.valueOf() ||
        res.locals.user.role === "admin"
      ) {
        if (post.imageUrl) {
          const filename = post.imageUrl.split("/uploads/images/posts")[1];
          fs.unlink(`uploads/images/posts/${filename}`, (err) => {
            if (err) throw err;
          });
        }
        Post.findByIdAndRemove(req.params.id, (err, docs) => {
          if (!err) res.send(docs);
          else console.log("Delete error : " + err);
        });
      } else {
        res.status(401).json({ error: "Non autorisé" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

exports.likes = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id unknown : " + req.params.id);

  try {
    Post.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true }
      // (err, docs) => {
      //   if (err) return res.status(400).send(err);
      // }
    ).catch((err) => res.status(400).send(err));

    User.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true }
      // (err, docs) => {
      //   if (!err) res.send(docs);
      //   else return res.status(400).send(err);
      // }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(400).send(err));
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.unlikes = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id unknown : " + req.params.id);

  try {
    Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true }
      // (err, docs) => {
      //   if (err) return res.status(400).send(err);
      // }
    ).catch((err) => res.status(400).send(err));

    User.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true }
      // (err, docs) => {
      //   if (!err) res.send(docs);
      //   else return res.status(400).send(err);
      // }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(400).send(err));
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.commentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id unknown : " + req.params.id);

  if (res.locals.user === null) {
    return res.status(401).json({ error: "Non autorisé" });
  }

  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.deleteCommentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id unknown : " + req.params.id);

  Post.findOne({ _id: req.params.id })
    .then((post) => {
      const theComment = post.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );
      if (
        theComment.commenterId === res.locals.user._id.valueOf() ||
        res.locals.user.role === "admin"
      ) {
        Post.findByIdAndUpdate(
          req.params.id,
          {
            $pull: {
              comments: {
                _id: req.body.commentId,
              },
            },
          },
          { new: true },
          (err, docs) => {
            if (!err) return res.send(docs);
            else return res.status(400).send(err);
          }
        );
      } else {
        res.status(401).json({ error: "Non autorisé" });
      }
    })
    .catch((err) => res.status(500).json(err));
};
