const mongoose = require("mongoose");
const { isEmail } = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      require: [true, "pseudo requis"],
      minlength: [3, "pseudo incorrect"],
      maxlength: [20, "pseudo incorrect"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      require: [true, "email requis"],
      validate: [isEmail, "email incorrect"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      require: [true, "mot de passe requis"],
      minlength: [6, "le mot de passe doit faire 6 caractères minimum"],
    },
    role: {
      type: String,
      default: "standard",
      required: true,
    },
    imageUrl: {
      type: String,
      default: "./uploads/images/profil/random-user.png",
    },
    banner: {
      type: String,
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator, { message: "{PATH} déjà pris" });

// function qui crypte le mdp (se déclanche avant la sauvegarde de userSchema)
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//compare mdp reçu et mdp enregistré
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("password incorrect");
  }
  throw Error("email incorrect");
};

module.exports = mongoose.model("User", userSchema);
