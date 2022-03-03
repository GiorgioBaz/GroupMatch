const mongoose = require("mongoose");
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

	grades: {
		type: String,
		required: false,
		default: "",
	},

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
});

module.exports = mongoose.model("User", user);
