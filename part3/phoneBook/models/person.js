const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;
console.log("connecting to url");

mongoose
	.connect(url)
	.then((result) => {
		console.log("Connected to MONGODB!");
	})
	.catch((error) => {
		console.log("Error connecting", error.message);
	});

const phoneBookSchema = new mongoose.Schema({
	name: String,
	phoneNumber: String,
});

phoneBookSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Person", phoneBookSchema);
