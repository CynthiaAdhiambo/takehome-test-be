const express = require("express");
const app = express();
const morgan = require("morgan"); // Logging package
const bodyParser = require("body-parser"); // parse body of incoming requests (supports url encoded bodies, json data)
const mongoose = require("mongoose");

const questionsRoutes = require("./apis/routes/questions-routes"); // importing the questions routes
const scoresRoutes = require("./apis/routes/scores-routes"); // importing the scores routes
const usersRoutes = require("./apis/routes/users-routes"); // importing the scores routes


console.log('reading env file', process.env.MONGO_ATLAS_PW);
// connecting to mongo db atlas
mongoose.connect(
  "mongodb+srv://admin:" +
    process.env.MONGO_ATLAS_PW +
    "@node-shop.66yxogc.mongodb.net/?retryWrites=true&w=majority",
  {}
);
mongoose.Promise = global.Promise;

// app.use('/uploads', express.static('uploads')) // uploading files during post

// Default Logging of server
app.use(morgan("dev"));

// parse body of incoming requests (supports url encoded bodies, json data)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handling CORS errors by attaching required headeers
app.use((req, res, next) => {
  res.header("Access-Control_Allow-Origin", "*");
  res.header(
    "Acces-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Allow-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes that should handle requests
app.use("/questions",  questionsRoutes);
app.use("/scores", scoresRoutes);
app.use("/users", usersRoutes);

// Error Handling for not found routes
app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});

// Error Handling for all other routes
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app; // exports the file
