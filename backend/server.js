const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, getToken } = require("./middleware/auth.middleware");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

//jwt (vérification token)
app.get("/jwtid", checkUser, getToken, (req, res) => {
  res
    .status(200)
    .send({ userId: res.locals.user._id, userRole: res.locals.user.role });
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
