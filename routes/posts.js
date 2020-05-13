var express = require("express");
var router = express.Router();
var Post = require("../models/post");
var { check, validationResult } = require('express-validator');

router.get("/add", function(req, res) {
	res.render("addpost",{
		"title": "Add Post"
	});
});

router.post("/", [check('title', "Title is required").not().isEmpty(),
	check('body', "Body is required").not().isEmpty()
], function(req, res){
	// const result= validationResult(req);
 //    var errors = result.errors;	
    var errors = validationResult(req).array();

	
	var title= req.body.title;
	var category = req.body.category;
	var body = req.body.body;
	var author = req.body. author;
	var date = new Date();

	if(req.body.picture){
		var pictureOriginalName = req.files.picture.OriginalName
		var pictureName 		 = req.files.picture.name;
		var pictureMine		 = req.files.picture.mimetype;
		var picturePath		 = req.files.picture.path;
		var pictureExt		 = req.files.picture.extension;
		var pictureSize		 = req.files.picture.size;
	}else{
		var pictureName = 'noimage.png';
	}

	//form validation
	

	//Check errors
	

	if(!errors.isEmpty()){
		res.render('addpost',{
			errors: errors,
			"title": title,
			"body": body
		});
	}else{
		var newPost ={title: title, category: category, body:body, author: author, date:date, picture: pictureName}
		//Create anew post and save to db
		Post.create(newPost, function(err, posts){
			if(err){
				console.log(err);
			}else{
				console.log(posts);
				req.flash("success", "Post submitted");
				res.redirect("/");
			}
		});

	}	
});


module.exports = router;