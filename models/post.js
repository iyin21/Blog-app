var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
	title: String,
	category: String,
	body: String,
	mainPicture:String,
	author: String,
	date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Post", PostSchema);

//date: {type: Date, default: Date.now}