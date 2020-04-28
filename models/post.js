var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
	title: String,
	categories: String,
	body: String,
	author: String,
	date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Post", PostSchema);

//date: {type: Date, default: Date.now}