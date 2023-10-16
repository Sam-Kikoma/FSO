const express = require("express");
const app = express();
const morgan = require("morgan");

let names = [
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
	{
		id: 5,
		name: "Samson Kikoma",
		number: "12-34-567899",
	},
];
// Middleware
app.use(express.json());

// Logging post requests
const postListen = (req, res, next) => {
	if (req.method === "POST") {
		morgan((tokens, req, res) => {
			return [
				tokens.method(req, res),
				tokens.url(req, res),
				tokens.status(req, res),
				tokens.res(req, res, "content-length"),
				"-",
				tokens["response-time"](req, res),
				"ms",
				JSON.stringify(req.body),
			].join(" ");
		})(req, res, next);
	} else {
		next();
	}
};

// Apply the custom middleware
app.use(postListen);
// Testing whether we're live
app.get("/", (req, res) => {
	res.send("<h1>It lives</h1>");
});
//Returning all notes
app.get("/api/persons", (req, res) => {
	res.json(names);
});
//Fetching a single resources
app.get("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	const name = names.find((name) => name.id === id);
	if (name) {
		res.json(name);
	} else {
		res.status(404).end();
	}
});

// ID generate
const createID = () => {
	// Random ID using math random
	return Math.floor(Math.random() * 100);
};
// Post request
app.post("/api/persons", (req, res) => {
	const body = req.body;

	if (!body.name || !body.number) {
		return res.status(400).json({ error: "Name or number missing" });
	}
	// Check if the name already exists
	const nameCheck = names.find((person) => person.name === body.name);

	if (nameCheck) {
		return res.status(400).json({ error: "Name must be a unique value" });
	}

	const newPerson = {
		id: createID(),
		name: body.name,
		number: body.number,
	};

	names = names.concat(newPerson);

	res.json(newPerson);
});

// Delete request
app.delete("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	names = names.filter((name) => name.id !== id);
	res.status(204).end;
});
// Date for info
const date = new Date();
// Info page
app.get("/info", (req, res) => {
	res.send(`<p>Phonebook has info for ${names.length} people</p> </br> ${date}`);
});

// Port to listen to
const PORT = 3001;
app.listen(PORT, () => {
	console.log(`It lives : ${PORT} again`);
});
