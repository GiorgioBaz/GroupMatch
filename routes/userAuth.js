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

app.post("/forgotpassword", (req, res) => {
	const body = req.body;
	const newPassword = body.password;
	const userEmail = body.email;

	User.findOne({ email: userEmail }, (err, user) => {
		if (err) throw err;

		if (!userEmail) {
			return res.send({
				success: false,
				message:
					"Please check your email for incorrect spelling or missing characters",
			});
		}

		if (!user) {
			return res.send({
				success: false,
				message:
					"Not a registered account, please check your email for incorrect spelling or missing characters",
			});
		}

		return res.send({
			success: true,
			message: "A reset email has been sent",
		});
	});
	if (newPassword) {
		User.findOneAndUpdate(
			{ email: userEmail },
			{ password: bcrypt.hash(body.password, 10) }
		).then(() => {
			return res.send("Your password has been changed!");
		});
	}
});

app.post("/logout", function (req, res) {
	req.logout();
	res.send("Successfully Logged Out");
});
//Gets the currently logged in user
app.get("/currentUser", (req, res) => {
	res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
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
