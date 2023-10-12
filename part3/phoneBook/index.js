const express = require("express");
const app = express();

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
