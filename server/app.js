const express = require("express");
const mongoose = require("mongoose");
//Import middleware
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
//Import routes
const authRouter = require("./routes/auth.routes");
const personRouter = require("./routes/person.routes");
const countryRouter = require("./routes/country.routes");
const genreRouter = require("./routes/genre.routes");
const movieRouter = require("./routes/movie.routes");
const ratingRouter = require('./routes/rating.routes')
const userRouter = require('./routes/user.routes')
//Error handlers
const {
  logErrors,
  errorHandler,
} = require("./middlewares/errorHandler.middleware");
const { HttpError } = require("./constants");
const AppError = require("./utils/AppError");
//Boot passport
require("./controllers/auth/passport")();

//Connect DB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://{username}:{password}@cluster.eowik.mongodb.net/phimmoi?retryWrites=true&w=majority"
    );
    console.log("DB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//init
connectDB();
const app = express();
//Setup middleware
app.use(express.json());
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      sameSite: 'none',    
    }
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "https://ndc-phimmoi.netlify.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/person", personRouter);
app.use("/api/v1/country", countryRouter);
app.use("/api/v1/genre", genreRouter);
app.use("/api/v1/movie", movieRouter);
app.use('/api/v1/rating', ratingRouter)
app.use('/api/v1/user', userRouter)
app.use("/*", (req, res, next) => {
  next(new AppError(HttpError.NOT_FOUND, "Route Not Found"));
});
app.use(logErrors);
app.use(errorHandler);

//Run server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
