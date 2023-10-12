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
];
// Testing whether we're live
app.get("/", (req, res) => {
	res.send("<h1>It lives</h1>");
});
//Returning all notes
app.get("/api/persons", (req, res) => {
	res.json(names);
});

// Port to listen to
const PORT = 3001;
app.listen(PORT, () => {
	console.log(`It lives : ${PORT} again`);
});
