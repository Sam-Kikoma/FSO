const mongoose = require("mongoose");
const password = process.argv[2];
const url = `mongodb+srv://SamKikoma:${password}@phonebookdb.mcgu6g5.mongodb.net/phoneApp?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const phoneBookSchema = new mongoose.Schema({
	name: String,
	phoneNumber: Number,
});

const Person = mongoose.model("Person", phoneBookSchema);

const person = new Person({
	name: `${process.argv[3]}`,
	phoneNumber: `${process.argv[4]}`,
});

//Saving a person
if (process.argv.length === 5) {
	person.save().then((result) => {
		console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
		mongoose.connection.close();
	});
}

//Fetching saved people
if (process.argv.length === 3) {
	Person.find().then((result) => {
		result.forEach((person) => {
			console.log(person);
		});
		mongoose.connection.close();
	});
}
