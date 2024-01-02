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
// Error handling middleware
const errorHandler = (error, request, response, next) => {
	console.error(error.message);
	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	}

	next(error);
};

//Root path
app.get("/", (request, response) => {
	response.send("<h1>Phonebook Backend</p>");
});

//Info route
app.get("/info", (request, response) => {
	const time = new Date();

	Person.countDocuments()
		.then((count) => {
			response.send(`<p>Phonebook has info for ${count} people.</p> ${time}`);
		})
		.catch((error) => {
			response.status(500).json({ error: "Internal Server Error" });
		});
});

// Fetching all resources
app.get("/api/persons", (request, response, next) => {
	Person.find({})
		.then((people) => {
			response.json(people);
		})
		.catch((error) => next(error));
});
//Fetching a single resource
app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			response.json(person);
		})
		.catch((error) => next(error));
});
//Deleting a resource
app.delete("/api/persons/:id", (request, response, next) => {
	Person.findOneAndDelete({ _id: request.params.id })
		.then((result) => {
			if (result) {
				response.status(204).end();
			} else {
				response.status(404).json({ error: "Person not found" });
			}
		})
		.catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
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
	person
		.save()
		.then((savedPerson) => {
			response.json(savedPerson);
		})
		.catch((error) => next(error));
});
app.use(errorHandler);
// Port
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`${PORT} is live baby`);
});
