var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
	title: String,
	category: String,
	body: String,
	mainPicture:String,
	author: String,
	date: {type: Date, default: Date.now}, 
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref : "Comment"
		}
	] 
});

module.exports = mongoose.model("Post", PostSchema);

//date: {type: Date, default: Date.now}