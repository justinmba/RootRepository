var mongoose = require("mongoose");
	mongoose.set('useUnifiedTopology', true);
	mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true});

var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});
 
module.exports = mongoose.model("Comment", commentSchema);