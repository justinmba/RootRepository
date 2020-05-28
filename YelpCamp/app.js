var express 	= require("express"),
	app 		= express(),
	bodyParser	= require("body-parser"),
	mongoose 	= require("mongoose"),
	Campground  = require("./models/campground"),
	Comment 	= require("./models/comment"),
	seedDB		= require("./seeds");

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// seedDB();

app.get("/", function(req, res){
	res.render("landing");
});

// INDEX - show all campgroudns
app.get("/campgrounds", function(req, res){
	// 	Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
		}
	});
	// res.render("campgrounds",{campgrounds:campgrounds});
});

// CREATE - add new campgroudns to DB
app.post("/campgrounds", function(req, res){
	// 	get data from form and add to camgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	// 	Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
		// 	redirect back to campgrounds page
		res.redirect("/campgrounds");
		}
	});
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

// ==============
// COMENTS ROUTES
// ==============

app.get("/campgrounds/:id/comments/new", function(req, res){
// 	find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
		console.log(err);	
		} else {
			res.render("comments/new", {campground: campground});
		}	
	})
});

app.post("/campgrounds/:id/comments", function(req, res){
// 	lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			})
		}
	})
	// create new comments
// 	connect new comment to campgournd
// 	redirect campground
})


app.listen(3000, function(){
	console.log("YelpCamp Server Has Started")
})









// var campgrounds = [
// 		{name: "Salmon Creek", image: 	"https://www.reserveamerica.com/webphotos/racms/articles/images/fef91bb3-1dff-444d-b0e5-d14db129ce1d_image2_0-main-tent.jpg"},
// 		{name: "Granite Hill", image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto"},
// 		{name: "Mountain Goat's Rest", image: "https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg"},
// 		{name: "Salmon Creek", image: 	"https://www.reserveamerica.com/webphotos/racms/articles/images/fef91bb3-1dff-444d-b0e5-d14db129ce1d_image2_0-main-tent.jpg"},
// 		{name: "Granite Hill", image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto"},
// 		{name: "Mountain Goat's Rest", image: "https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg"},
// 		{name: "Salmon Creek", image: 	"https://www.reserveamerica.com/webphotos/racms/articles/images/fef91bb3-1dff-444d-b0e5-d14db129ce1d_image2_0-main-tent.jpg"},
// 		{name: "Granite Hill", image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto"},
// 		{name: "Mountain Goat's Rest", image: "https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg"}
// ];