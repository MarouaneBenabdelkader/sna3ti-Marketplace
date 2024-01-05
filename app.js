var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");
const decodeToken = require("./middlewares/decodeToken");
const redis = require("redis");
const redisClient = redis.createClient({
  host: "localhost", // or your Redis server host
  port: 6379, // or your Redis server port
});
// to clear the console after modifications
process.stdout.write("\u001b[2J\u001b[0;0H");
/* Loads all variables from .env file to "process.env" */
require("dotenv").config();

var app = express();

// env variables
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const ROOT_URL = dev ? `http://localhost:${port}` : process.env.PRODUCTION_URL;

// mongoose options - connection
const mongooseOptions = {
  useNewUrlParser: true,
};
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI, mongooseOptions)
  .then(() => console.log("DB connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));

// Add this line to log when connected successfully
redisClient.on("connect", () => console.log("Redis Connected"));

redisClient.connect();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3001"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(decodeToken);
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/static", express.static(path.join(__dirname,'public', 'uploads')));
/* Express Validator will validate form data sent to the backend */

/* if (!dev) {
    sessionConfig.cookie.secure = true; // serve secure cookies in production environment
    app.set("trust proxy", 1); // trust first proxy
} */
app.use((req, res, next) => {
  req.redisClient = redisClient;
  next();
});
app.use("/api/resources/", require("./routes/resourcesRoutes"));
app.use("/api/admins", require("./routes/adminRoutes"));
app.use("/api/handicrafts", require("./routes/handicraftRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// catch 404 and forward to error handler
app.use("/api/*", function (req, res, next) {
  res.status(404).send({
    status: 404,
    message: "not found",
  });
  // next(createError(404));
});

/* // error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(413).send('File size too large');
    }

    // render the error page
    res.status(err.status || 500);
    res.render("error");
}); */

module.exports = app;
