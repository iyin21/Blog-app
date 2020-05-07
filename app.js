var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var mongoose = require("mongoose");
var multer = require('multer');
var flash = require('connect-flash');

//requiring routes
var indexRoutes = require("./routes/index");
var postRoutes = require("./routes/posts");
//mongoose setup
mongoose.connect("mongodb://localhost/blogapp",{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

app.locals.moment = require("moment");
app.use(bodyParser.urlencoded({extended : true})) ;
//Express session
app.use(session({
	secret: "Besos",
	resave: "false",
	saveUninitialized: "false"
}));

//set up view engine
app.set('view engine', 'ejs');


//setup file uploads
app.use(multer({dest:'./uploads'}).single('photo'));
app.use(express.static(__dirname + "/public/images/uploads"));
//setup flash
app.use(flash());

app.use(indexRoutes);
app.use("/posts", postRoutes);

app.listen(2000, function(){
	console.log("Blogapp has started");
});


