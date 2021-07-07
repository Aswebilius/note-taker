const express = require("express");
const fs = require("fs");
const path =require("path");
const notes = require("./db/db.json");
const uuid = require("uuid");

const app = express();
var port = process.env.PORT || 3017;

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.stactic("./public"));


//Get API db.json
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(_dirname, "./db/db.json"))
});

