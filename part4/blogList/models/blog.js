// Network bit
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoUrl = process.env.MONGODB_URI;
mongoose
	.connect(mongoUrl)

	.then((result) => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message);
	});

// Schema

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});
module.exports = mongoose.model("Blog", blogSchema);
