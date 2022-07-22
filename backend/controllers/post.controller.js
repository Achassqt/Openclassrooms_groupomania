const { response } = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createPost = async (req, res) => {
  // const postInRequest = JSON.parse(req.body.post);
  console.log(req.body);
  const newPost = new Post({
    imageUrl: `${req.protocol}://${req.get("host")}/uploads/images/posts/${
      req.file.filename
    }`,
    posterId: postInRequest.posterId,
    message: postInRequest.message,
    likers: [],
    comments: [],
  });

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

  const updatedPost = {
    message: req.body.message,
  };

  Post.findOneAndUpdate(
    req.params.id,
    { $set: updatedPost },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

exports.deletePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id unknown : " + req.params.id);

  Post.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
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
    return res.status(400).send(err);
  }
};

exports.editCommentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id unknown : " + req.params.id);

  try {
    return Post.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) {
        return res.status(404).send("Comment not found");
      } else {
        theComment.text = req.body.text;
      }

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.deleteCommentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id unknown : " + req.params.id);

  try {
    return Post.findByIdAndUpdate(
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
  } catch (err) {
    return res.status(400).send(err);
  }
};
