const mongoose = require("mongoose");
const { Schema } = mongoose;
const user = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true, //mandatory attribute
			trim: true, //cuts whitespace at the end of the input field
			minlength: 3, //sets min name length to 3 chars
			default: "",
		},

		email: {
			type: String,
			required: true,
			unique: true, //primary key will be email (already configured in MongoDB Atlas)
			default: "",
		},

		password: {
			type: String,
			required: true,
			default: "",
		},

		passwordRequested: {
			type: Boolean,
			required: true,
			default: false,
		},

		academics: [
			{ grade: Schema.Types.String, subject: Schema.Types.String },
		],

		degree: {
			type: String,
			required: false,
			default: "",
		},

		gpa: {
			type: String,
			required: false,
			default: "",
		},

		studyLoad: {
			type: String,
			required: false,
			default: "",
		},

		avatar: {
			type: String,
			required: true,
			default:
				"https://res.cloudinary.com/doyt19vwv/image/upload/v1648267669/blank-profile-temp_lpa44x.png",
		},

		cloudinary_id: {
			type: String,
			required: false,
			default: "",
		},

		// add an overarching user key to it for semantics then copy for other keys
		numUsers: {
			type: Number,
			required: false,
			default: 0,
		},

		numLogins: {
			type: Number,
			required: false,
			default: 0,
		},

		allUsers: {
			type: [
				{
					user: {
						_id: Schema.Types.ObjectId,
						email: Schema.Types.String,
						name: Schema.Types.String,
						degree: Schema.Types.String,
						gpa: Schema.Types.String,
						studyLoad: Schema.Types.String,
						avatar: Schema.Types.String,
						academics: [
							{
								grade: Schema.Types.String,
								subject: Schema.Types.String,
							},
						],
						facebook: Schema.Types.String,
						instagram: Schema.Types.String,
						twitter: Schema.Types.String,
						createdAt: Schema.Types.Date,
						updatedAt: Schema.Types.Date,
					},
				},
			],
			required: false,
			default: [],
		},

		potentialMatches: {
			type: [
				{
					user: {
						id: Schema.Types.ObjectId,
						name: Schema.Types.String,
					},
				},
			],
			required: false,
			default: [],
		},

		confirmedMatches: {
			type: [
				{
					user: {
						id: Schema.Types.ObjectId,
						name: Schema.Types.String,
						displayed: {
							type: Schema.Types.Boolean,
							default: false,
						},
					},
				},
			],
			required: false,
			default: [],
		},

		facebook: {
			type: String,
			required: false,
			default: "",
		},

		instagram: {
			type: String,
			required: false,
			default: "",
		},

		twitter: {
			type: String,
			required: false,
			default: "",
		},
	},
	{
		// Make Mongoose use Unix time (seconds since Jan 1, 1970)
		timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
	}
);

module.exports = mongoose.model("User", user);
