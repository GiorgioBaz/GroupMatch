const User = require("./models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
	passport.use(
		new localStrategy(
			{ usernameField: "email" },
			(email, password, done) => {
				User.findOne({ email: email }, (err, user) => {
					if (err) throw err;
					if (!user) return done(null, false);
					bcrypt.compare(password, user.password, (err, result) => {
						if (err) throw err;
						if (result === true) {
							return done(null, user);
						} else {
							return done(null, false);
						}
					});
				});
			}
		)
	);

	passport.serializeUser((user, cb) => {
		cb(null, user.id);
	});

	passport.deserializeUser((id, cb) => {
		User.findOne({ _id: id }, (err, user) => {
			const userInformation = {
				id: user.id,
				name: user.name,
				email: user.email,
				degree: user.degree,
				academics: user.academics,
				gpa: user.gpa,
				studyLoad: user.studyLoad,
				avatar: user.avatar,
				cloudinary_id: user.cloudinary_id,
				allUsers: user.allUsers,
				numUsers: user.numUsers,
				potentialMatches: user.potentialMatches,
				confirmedMatches: user.confirmedMatches,
				facebook: user.facebook,
				instagram: user.instagram,
				twitter: user.twitter,
				numLogins: user.numLogins,
				displayed: user.displayed,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			};
			cb(err, userInformation);
		});
	});
};
