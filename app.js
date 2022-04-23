const express = require('express');
const path = require('path');

// to initialize
const app = express();

// to assign the port
const port = 3001;

// to import
const fs = require('fs');

//API routes (get, post, delete) for the notes
app.get('/api', (req, res) => {

});

// HTML routes, to get the html to link and work...
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// to link the port so everything works...
app.listen(port, () => console.log(`Listening on port ${port}`));