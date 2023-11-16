const mongoose = require("mongoose");

// Command line arguments
if (process.argv.length < 3) {
	console.log("Insufficient number of arguments");
	process.exit(1);
}

const password = process.argv[2];

// Cluster URL
const url = `mongodb+srv://SamKikoma:${password}@cluster0.8xo9h.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

// Schema
const phoneBookSchema = new mongoose.Schema({
	name: String,
	phoneNumber: String,
});

// Model
const Person = mongoose.model("Person", phoneBookSchema);

// Check if only the password is provided
if (process.argv.length === 3) {
	// Find and display all entries in the phonebook
	Person.find({}).then((result) => {
		result.forEach((person) => {
			console.log(person);
		});
		mongoose.connection.close();
	});
} else {
	const name = process.argv[3];
	const phoneNumber = process.argv[4];

	// Create a new person and save to the database
	const person = new Person({
		name: `${name}`,
		phoneNumber: `${phoneNumber}`,
	});

	person.save().then((result) => {
		console.log(`Added ${name} and ${phoneNumber} to phonebook`);
		mongoose.connection.close();
	});
}
