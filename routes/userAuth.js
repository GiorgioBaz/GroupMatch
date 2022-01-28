const express = require("express");
const app = express();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
//----------------------------------------- END OF IMPORTS---------------------------------------------------

// Routes
app.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) throw err;
		if (!user) res.send("No User Exists");
		else {
			req.logIn(user, (err) => {
				if (err) throw err;
				res.send("Successfully Authenticated");
				console.log(req.user);
			});
		}
	})(req, res, next);
});

app.post("/register", (req, res) => {
	User.findOne({ username: req.body.username }, async (err, doc) => {
		if (err) throw err;
		if (doc) res.send("User Already Exists");
		if (!doc) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			const newUser = new User({
				username: req.body.username,
				password: hashedPassword,
			});
			await newUser.save();
			res.send("User Created");
		}
	});
});

app.get("/user", (req, res) => {
	res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

app.post("/logout", function (req, res) {
	req.logout();
	res.send("Successfully Logged Out");
});

module.exports = app;
