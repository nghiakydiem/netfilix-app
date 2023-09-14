const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const connectMongoDB = require("./utils/connectMongoDB");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");

require("dotenv").config();

const app = express();

// Configure
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
      secure: true,
      expires: 60 * 2,
    },
  }),
);

connectMongoDB();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Server running on port:", process.env.PORT);
  }
});
