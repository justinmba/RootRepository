var faker = require("faker");

console.log("=============");
console.log("My Little Shop");
console.log("=============");

for(var i = 0; i < 10; i++){
	console.log(faker.commerce.productName() + " - $" + faker.commerce.price());
}


// var loops = 0;

// var loop = function(){
//     while(loops < 10){
//     //Your code goes here!
//         console.log(faker.fake("{{commerce.productName}} - ${{commerce.price}}"));
//         loops++;
//     }
// };

// loop();
