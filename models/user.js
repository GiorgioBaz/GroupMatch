const mongoose = require("mongoose");
const user = new mongoose.Schema({
	name: { type: String, default: "" },
	email: String,
	password: String,
});

module.exports = mongoose.model("User", user);
