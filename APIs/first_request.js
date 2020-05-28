var request = require('request');
request('http://www.google.com', function(error, response, body){
	eval(require('locus'))
	if(!error && response.statusCode == 200){
		console.log("Something went wrong");
		console.log(error);
	} 
});