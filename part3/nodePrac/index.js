require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Note = require("./models/note");
app.use(cors());
app.use(express.json());
//Show static content
app.use(express.static("dist"));

app.get("/", (request, response) => {
	response.send("<h1>Hello World</h1>");
});
// Fetching a single resource
app.get("/api/notes/:id", (request, response) => {
	Note.findById(request.params.id).then((note) => {
		response.json(note);
	});
});
//Fetching all resources
app.get("/api/notes", (request, response) => {
	Note.find({}).then((notes) => {
		response.json(notes);
	});
});
//Deleting a resource
app.delete("api/notes/:id", (request, response) => {
	const id = request.params.id;
	notes = notes.filter((note) => note.id !== id);
});

app.post("/api/notes", (request, response) => {
	const body = request.body;

	if (body.content === undefined) {
		return response.status(400).json({
			error: "content missing",
		});
	}

	const note = new Note({
		content: body.content,
		important: body.important || false,
	});

	note.save().then((savedNote) => {
		response.json(savedNote);
	});
});

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server is running ${PORT}`);
