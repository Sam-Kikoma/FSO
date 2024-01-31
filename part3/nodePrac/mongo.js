const mongoose = require("mongoose");
if (process.argv.length < 3) {
    console.log("Give password as an argument");
    process.exit(1);
}

const password = process.argv[2];

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
    content: "The boy is cooking",
    important: true,
});

//Fetching a note
Note.find({}).then((result) => {
    result.forEach((note) => {
        console.log(note);
    });
    mongoose.connection.close();
});

//Saving a note
// note.save().then((result) => {
// 	console.log("Note saved");
// 	mongoose.connection.close();
// });
