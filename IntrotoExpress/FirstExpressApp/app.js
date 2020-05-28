var express = require("express");
var app = express();

// when you go to / you get Hi there
// Below - req stands for request, res stands for response

app.get("/", function(req, res){
	res.send("Hi There");
});

//  when you go to /bye you get boodbye
app.get("/bye", function(req, res){
	res.send("Goodbye");
});

// when you go /dog you get MEOW
app.get("/dog", function(req, res){
	console.log("Someone made a request to /dog")
	res.send("Meow")
})

// This creates a page if the page doesn't exist 
app.get("*", function(req, res){
	res.send("This is a page that doesn't exist");
});




// Tell Express to listen for requests (start server)

app.listen(3000, function(){
	console.log("Server is Running");
});