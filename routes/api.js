const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

router.get("/todos", async (req, res, next) => {
	try {
		const todo = await Todo.find({}, "action");
		res.json(todo);
	} catch (err) {
		return next(err);
	}
});

router.post("/todos", (req, res, next) => {
	if (req.body.action) {
		Todo.create(req.body)
			.then((data) => res.json(data))
			.catch(next);
	} else {
		res.json({
			error: "The input field is empty",
		});
	}
});

router.delete("/todos/:id", (req, res, next) => {
	Todo.findOneAndDelete({ _id: req.params.id })
		.then((data) => res.json(`Successfully deleted ${data._id}`))
		.catch(next);
});

module.exports = router;
