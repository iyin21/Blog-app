var express = require("express");
var router = express.Router();
var Post = require("../models/post");
var Comment = require("../models/comment");

router.get("/new", function(req, res){
	Post.findById(req.params.id, function(err, post){
		if(err){
			console.log(err);
		}else{
			res.render("new",{ post: post});
		}
	});
});

router.post("/", function(req, res){
	var commentDate = new Date();
	Post.findById(req.params.id, function(err, post){
		if(err){
			console.log(err);
			redirect("home");
		}else{
			Comment.create(req.body.comment, {commentDate: commentDate}, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong")
				}else{
					comment.save()
					post.comments.push(comment);
					post.save();
					req.flash("success", "Succesfully added comment");
					res.redirect("/posts/"+ "post._id");
				}
			})
			
		}
	})
})

module.exports= router;