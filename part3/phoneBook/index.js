require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Person = require("./models/person");
app.use(express.json());
//Serve static files from backend
app.use(express.static("dist"));
//Morgan middleware
const morgan = require("morgan");
morgan.token("req-body", (req) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :req-body"));

app.use(cors());

//Root path
app.get("/", (request, response) => {
	response.send(`<h1>Phonebook Backend</p>`);
});

//Info route
// app.get("/info", (request, response) => {
// 	const time = new Date();
// 	const count = persons.length;
// 	response.send(`<p>Phonebook has info for ${count} people</p>${time}`);
// });

// Fetching all resources
app.get("/api/persons", (request, response) => {
	Person.find({}).then((people) => {
		response.json(people);
	});
});
//Fetching a single resource
app.get("/api/persons/:id", (request, response) => {
	Person.findById(request.params.id).then((person) => {
		response.json(person);
	});
});
//Deleting a resource
app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((person) => person.id !== id);
	return response.status(204).end();
});

app.post("/api/persons", (request, response) => {
	const body = request.body;

	// Check if the required fields are missing
	if (!body.name || !body.phoneNumber) {
		return response.status(400).json({
			error: "Content is missing",
		});
	}

	// Create a new person
	const person = new Person({
		name: body.name,
		phoneNumber: body.phoneNumber,
	});

	// Saving
	person.save().then((savedPerson) => {
		response.json(savedPerson);
	});
});

// Port
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`${PORT} is live baby`);
});
