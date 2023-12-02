const express = require("express");
const app = express();

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

//Info route
app.get("/info", (request, response) => {
	const time = new Date();
	const count = persons.length;
	response.send(`<p>Phonebook has info for ${count} people</p>${time}`);
});

// Fetching all resources
app.get("/api/persons", (request, response) => {
	response.json(persons);
});
//Fetching a single resource
app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => person.id === id);
	person ? response.json(person) : response.status(404).end();
});
//Deleting a resource
app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((person) => person.id !== id);
});
//Adding a resource
const generateId = () => {
	const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
	return maxId + 1;
};
app.post("/api/persons", (request, response) => {
	const body = request.body;

	// Check if the required fields are missing
	if (!body.name || !body.number) {
		return response.status(400).json({
			error: "Name or number missing",
		});
	}

	// Check if the name already exists
	const nameExists = persons.some((person) => person.name === body.name);
	if (nameExists) {
		return response.status(400).json({
			error: "Enter a unique name",
		});
	}

	// Create a new person
	const person = {
		id: generateId(),
		name: body.name,
		number: body.number,
	};

	// Add the new person to the persons array
	persons = persons.concat(person);

	// Respond with the new person
	response.json(person);
});

// Port
const PORT = 3001;
app.listen(PORT);
console.log(`${PORT} is live baby`);
