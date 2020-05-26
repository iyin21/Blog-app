var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
	name: String,
	text: String,
	commentDate: {type: Date, default: Date.now}
});
module.exports= mongoose.model("Comment", CommentSchema); 