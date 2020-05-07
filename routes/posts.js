var express = require("express");
var router = express.router;
var Post = require("../models/post");

router.get("/add", function(req, res) {
	res.render("addpost", 
		{title: Add Post})
});

router.post("/",function(req, res){
	
	var title= req.body.title;
	var category = req.body.category;
	var body = req.body.body;
	var author = req.body. author;

	if(req.body.picture){
		var pictureOriginalName = req.files.picture.OriginalName
		var pictureName 		 = req.files.picture.name;
		var pictureMine		 = req.files.picture.mimetype;
		varpicturePath		 = req.files.picture.path;
		var pictureExt		 = req.files.picture.extension;
		var pictureSize		 = req.files.picture.size;
	}else{
		var pictureName = 'noimage.png';
	}

	req.checkBody('title', "Title is required").empty;
	req.checkBody('body',"Body is required").empty;
	var errors = req.validationErrors();

	var newPost ={title: title, category: category, body:body, author: author, picture: pictureName}
})


module.exports = router;