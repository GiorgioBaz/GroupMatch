const express = require("express");
const app = express();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const nodemailer = require('nodemailer');
const user = require("../models/user");
//----------------------------------------- END OF IMPORTS---------------------------------------------------

// Routes
app.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) throw err;
		if (!user) res.send({ success: false, message: "No User Exists" });
		else {
			req.logIn(user, (err) => {
				if (err) throw err;
				res.send({
					success: true,
					message: "Successfully Authenticated",
				});
				console.log(req.user);
			});
		}
	})(req, res, next);
});

app.post("/register", (req, res) => {
	User.findOne({ email: req.body.email }, async (err, doc) => {
		if (err) throw err;

		if (doc) res.send({ success: false, message: "User Already Exists" });

		if (!doc) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: hashedPassword,
			});
			await newUser.save();
			res.send({ success: true, message: "User Created" });
		}
	});
});

app.post("/forgotpassword", (req, res) => {
	const body = req.body;
	const newPassword = body.password;
	const userEmail = body.email;
	const inputtedCode = body.resetCode;

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

		if (user && !newPassword) {
			return res.send({
				success: true,
				message: "A reset email has been sent",
			});
		}
	});

	User.findOne({ email: userEmail }, (err, user) => {
		if (user && !user.passwordRequested) {
			const currentUserId = user._id;

			User.findOneAndUpdate(
				{ email: userEmail },
				{ passwordRequested: true }
			).then();
		} else if (user && user.passwordRequested) {
			if (!newPassword) {
				return res.send({
					success: false,
					message: "Password cannot be blank!",
				});
			}

			if (newPassword.length < 8) {
				return res.send({
					success: false,
					message: "Password cannot be shorter than 8 characters",
				});
			} else {
				User.findOne({ _id: inputtedCode }, async (err, user) => {
					//This query is an ID check to see if the user already exists
					if (!user) {
						return res.send({
							success: false,
							message: "Incorrect reset code",
						});
					}

					if (user && user.passwordRequested) {
						User.findOneAndUpdate(
							{ _id: inputtedCode },
							{ passwordRequested: false }
						).then(); //find the unique user entry and execute an update to log the account's successful email verification

						User.findOneAndUpdate(
							{ email: userEmail },
							{ password: await bcrypt.hash(newPassword, 10) }
						).then(() => {
							req.logOut();
							return res.send({
								success: true,
								message: "Your password has been changed!",
							});
						});
					}
				});
			}
		}
	});
	
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD
		}
	});
	
	let mailOptions = {
		from: "...",
		to: userEmail,
		subject: "GroupMatch - Forgot Password",
		text: "test test test"
	};
	
	transporter.sendMail(mailOptions, function(err, data) {
		if (err) {
			console.log("Error Occurs: ", err);
		} else {
			console.log("email send");
		}
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

