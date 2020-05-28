var express = require("express");
var app = express();


app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animalName", function(req, res){
			var sounds = {
			pig: "Oink",
			cow: "Moo",
			duck: "Quack"
		}
		var animal = req.params.animal.tolowerCase();
		var sound = sounds[animal];
		res.send("The " + animal + " says '" + "'");
	});
	
// 	This is the longer way I originally did it, still works
	// var animal = req.params.animalName;
	// if(animal === "cow"){
	// 	var sound = "Moo"
	// } 
	// if(animal==="duck") {
	// 	var sound = "Quack"
	// } 
	// if(animal === "pig"){
	// 	var sound = "Oink"
	// } 
	// if(animal==="dog") {
	// 	var sound = "Woof Woof!"
	// }
	// if(animal==="Cat") {
	// 	var sound = "Meow!"
	// }
	// res.send("The " + animal + " says " + sound);
			// });


app.get("/repeat/:message/:times", function(req, res){
	var message = req.params.message;
	var times = Number(req.params.times);
	var result = "";
	
	for(var i = 0; i < times; i++){
		result += message + " ";
	}
		
	res.send(result);
});


app.get("*", function(req, res){
	res.send("Sorry, page not found... What are you doing with your life?");
});


app.listen(3000, function(){
	console.log("Server is Running");
});

