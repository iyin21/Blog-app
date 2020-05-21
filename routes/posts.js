var express = require("express");
var router = express.Router();
var Post = require("../models/post");
var { check, validationResult } = require('express-validator');
var multer  = require('multer')
var path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads') //Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //File name after saving
  }
})

var uploads = multer({ storage: storage })



router.get("/add", function(req, res) {
	res.render("addpost",{
		"title": "Add Post"
	});
});

router.post("/", uploads.single('mainPicture'), [check('title', "Title is required").not().isEmpty(),
	check('body', "Body is required").not().isEmpty()
],  function(req, res){
	//var result= validationResult(req);
    //var errors = result.errors;	
    var errors = validationResult(req);
//upload.single('picture'),	

	var title= req.body.title;
	var category = req.body.category;
	var body = req.body.body;
	var author = req.body. author;
	var date = new Date();

	if(req.file){
		var mainPictureOriginalName = req.file.originalname;
		var mainPictureName 		 = req.file.filename;
		var mainPictureMime		 = req.file.mimetype;
		var mainPicturePath		 = req.file.path;
		var mainPictureExt		 = req.file.extension;
		var mainPictureSize		 = req.file.size;
	}else{
	 	var mainPictureName = 'noimage.png';
	}
	console.log(req.file);

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
router.get("/show/:id", function(req, res){
	Post.findById(req.params.id, function(err, post){
		res.render("show",{
			post:post
		});
	});
});
router.get("/show/:category", function(req, res){
	Post.find({category: req.params.category}, function(err, categories){
		res.render("home",{
			title: req.params.category,
			posts:categories

		});
	});
});
module.exports = router;