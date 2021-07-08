const express = require("express");
const fs = require("fs");
const path =require("path");
const notes = require("./db/db.json");
const uuid = require("uuid");
const app = express();
var port = process.env.PORT || 3017;

var port = process.env.PORT || 3017;

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.stactic("./public"));


//Get API db.json
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"))
});

//POST function to add new notes
app.post("/api/mptes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const newNotes =req.body;
  newNotes.id = uuid.v4();
  notes.push(newNotes);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes))
  res.json(notes);
});

//Delete notes
app.delete("/api/notes/:id", (req, res) => {
  const notes =JSON.parse(fs.readFileSync("./db/db.json"));
  const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id)
  fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
  res.json(delNote); 
})

//Calls index.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//calls notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//Listener for PORT
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});