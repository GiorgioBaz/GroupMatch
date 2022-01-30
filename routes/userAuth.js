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
	User.findOne({ email: req.body.email }, async (err, doc) => {
		if (err) throw err;
		if (doc) res.send("User Already Exists");
		if (!doc) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: hashedPassword,
			});
			await newUser.save();
			res.send("User Created");
		}
	});
});

//Gets the currently logged in user
app.get("/currentUser", (req, res) => {
	res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

app.post("/logout", function (req, res) {
	req.logout();
	res.send("Successfully Logged Out");
});

//----------------------------------------- Postman Routes Only ---------------------------------------------------

// DELETES ALL USERS IN THE DB ---- USE WISELY
app.delete("/deleteAll", async function (req, res) {
	await User.deleteMany({});
	res.send("Successfully Deleted All Records");
});

// Gets a specific user by email
app.post("/user", function (req, res) {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (err) throw err;
		if (!user) res.send("Ya dun goofed lad");
		else {
			res.send(user);
		}
	});
});

// Convienient Way to Get All Users in DB
app.get("/allUsers", function (req, res) {
	User.find({}, (err, user) => {
		if (err) throw err;
		if (!user) res.send("Ya dun goofed lad");
		else {
			res.send(user);
		}
	});
});

module.exports = app;
