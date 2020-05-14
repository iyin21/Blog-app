var express = require("express");
var router = express.Router();
var Post = require("../models/post");
var { check, validationResult } = require('express-validator');
//var multer  = require('multer')
//var upload = multer({ dest: '../uploads/' })


router.get("/add", function(req, res) {
	res.render("addpost",{
		"title": "Add Post"
	});
});

router.post("/", [check('title', "Title is required").not().isEmpty(),
	check('body', "Body is required").not().isEmpty()
], function(req, res){
	//var result= validationResult(req);
    //var errors = result.errors;	
    var errors = validationResult(req);
//upload.single('picture'),	

	var title= req.body.title;
	var category = req.body.category;
	var body = req.body.body;
	var author = req.body. author;
	var date = new Date();

	if(req.body.mainPicture){
		var pictureOriginalName = req.files.mainPicture.OriginalName
		var pictureName 		 = req.files.mainPicture.name;
		var pictureMine		 = req.files.mainPicture.mimetype;
		var picturePath		 = req.files.mainPicture.path;
		var pictureExt		 = req.files.mainPicture.extension;
		var pictureSize		 = req.files.mainPicture.size;
	}else{
		var mainPictureName = 'noimage.png';
	}

	//form validation
	

	//Check errors
	//!errors.isEmpty()
	if(!errors.isEmpty()){
		res.render('addpost',{
			errors: errors.array()[0].msg,
			title: title,
			body: body
		});
	}else{
		var newPost ={title: title, category: category, body:body, author: author, date:date, mainPicture: mainPictureName}
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