var mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/cat_app", { useNewUrlParser: true});

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// adding a new cat to the DB

var george = new Cat({
	name: "George",
	age: 11,
	temperament: "Grouchy"
});

george.save(function(err, cat){
	if(err){
		console.log("Something Went Wrong!")
	} else {
		console.log("We Just saved a cat to the DB:")
		console.log(cat);
	}
});

Cat.create({
	name: "Snowwhite",
	age: 15,
	temperament: "Bland"
}, function(err, cat){
	if(err){
		console.log(err)
	} else {
		console.log("We Just saved a cat to the DB:")
		console.log(cat);
	}
});

// retrieve all cats from the DB and console.log each one



