const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const userRouter = require("./routes/userRoutes");
const { connectMongoDB } = require("./connectMongoDB");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.URL_ORIGIN_KEY],
    method: ["GET", "POST"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      expires: 60 * 2,
    },
  }),
);

// CONNECT TO MONGODB
connectMongoDB();

// SET PATH STATIC
app.use("/api/user", userRouter);
app.get("/api/login", (req, res) => {
  res.cookie("remember", "login-token", {
    secure: false,
    maxAge: 2000,
  });
  return res.end("Welcome to website");
});

// RUN SERVER
app.listen(process.env.PORT, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.log("Server running on port:", process.env.PORT);
  }
});
