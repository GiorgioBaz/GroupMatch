const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const User = require('./user');

mongoose.connect("mongodb+srv://derek:grouper@cluster0.wivsz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
{
    userNewUrlParser: true,
    useUnifiedTopology: true,
},
() => {
    console.log("Mongoose is Connected");
}
)

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:3000",
    credential: true
}))

app.use(session({
    secret: "secretcode",
    resave: true,
    saveUnintialized: true
}));

app.use(cookieParser("secretcode"))

app.post("/login", (req, res) => {
    console.log(req.body);
})

app.post("/register", (req, res) => {
    console.log(req.body);
    User.findOne({username: req.body.username}, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
            });
            await newUser.save();
            res.send("User Created");
        }
    });
});

app.get("/user", (req, res) => {
    res.send(req.user);
});

app.listen(5000,() => {
    console.log('Server Has Started')
})
