const mongoose = require("mongoose");
const { Schema } = mongoose;
const user = new mongoose.Schema({
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

	academics: [{ grade: Schema.Types.String, subject: Schema.Types.String }],

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
			"https://res.cloudinary.com/doyt19vwv/image/upload/v1646923245/odydlozucf9ql6osef2g.jpg",
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

	allUsers: {
		type: [
			{
				user: {
					_id: Schema.Types.ObjectId,
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
				},
			},
		],
		required: false,
		default: [],
	},
});

module.exports = mongoose.model("User", user);
