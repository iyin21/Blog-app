var express = require("express");
var router = express.Router();
var Post = require("../models/post");

// Post.create(
// 	{
// 		title: "My Very First Post",
// 		categories: "Movie",
// 		body: "This is so nice and beautiful",
// 		author: "Iyin"
// 	}, function(err, post){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log("New Post");
// 			console.log(post);
// 		}
// 	});
router.get("/", function(req, res){
	//get all posts from db
	Post.find({}, function(err, posts){
		if(err){
			console.log(err);
		}else{
			res.render("home",
				{posts: posts});
		}
	});
});


module.exports = router;
