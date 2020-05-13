var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var { check, validationResult } = require('express-validator');
//var check = require('express-validator');
//var validationResult = require('express-validator');
var mongoose = require("mongoose");
var multer = require('multer');
var Post = require("./models/post");
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
app.use(express.static(__dirname + "/public"));
//setup flash
app.use(flash());
app.use(function(req, res, next){
	res.locals.messages = require('express-messages')(req, res);
	next();
});
app.use(function(req, res, next){
  res.locals.errors = req.flash("errors");
  next();
});
//Express validator
// app.use(expressValidator({
// 	errorFormatter: function(param, msg, value) {
//       var namespace = param.split('.')
//       , root    = namespace.shift()
//       , formParam = root;

//     while(namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param : formParam,
//       msg   : msg,
//       value : value
//     };
//   }
// }));

app.use(indexRoutes);
app.use("/posts", postRoutes);

app.listen(2000, function(){
	console.log("Blogapp has started");
});


