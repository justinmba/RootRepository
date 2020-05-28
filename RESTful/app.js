var express 		= require("express"),
	app		 		= express(),
	methodOverride 	= require("method-override"),
	expressSanitizer= require("express-sanitizer")
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose");

// 	APP CONFIG
	mongoose.set('useUnifiedTopology', true);
	mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true});
	app.set("view engine", "ejs");
	app.use(express.static("public"));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(expressSanitizer());
	app.use(methodOverride("_method"));
	mongoose.set('useFindAndModify', false);

// MONGOOSE/MODEL CONFIT
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);


// RESTFUL ROUTS

app.get("/", function(req, res){
	res.redirect("/blogs");
});

// Index route
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("Error!");
		} else {
			res.render("index", {blogs: blogs});
		}
	});
});

// New route
app.get("/blogs/new", function(req, res){
	res.render("new");
})

// Create Route
app.post("/blogs", function(req, res){
	// create blogs
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		} else {
				// then redirect to index
			res.redirect("/blogs")
		}
	});
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	});
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
});

// UPDATE ROUTE
app.put("/blogs/:id", function (req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body)
	// Blog.findByIdAndUpdate(id, newData, callback)
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	})
});

app.listen(3000, function(){
	console.log("RESTful Server is Running")
});