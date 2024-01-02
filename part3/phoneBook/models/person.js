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
	name: {
		type: String,
		minLength: 3,
		required: true,
	},
	phoneNumber: {
		type: String,
		minLength: 8,
		validate: {
			validator: function (value) {
				const regex = /^.{2,3}(.+)$/;
				return regex.test(value);
			},
			message: "Invalid format",
		},
	},
});

phoneBookSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Person", phoneBookSchema);
