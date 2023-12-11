const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config.env" });
const app = express();
const userAuth = require("./routes/userAuth");
const port = process.env.PORT || 5000;
//----------------------------------------- END OF IMPORTS---------------------------------------------------

// Connect to the database
mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000", // <-- location of the react app were connecting to
        credentials: true,
    })
);
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.use("/api", userAuth);

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

//Start Server
app.listen(port, () => {
    console.log("Server is listening on port 5000");
});
