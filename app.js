// to assign the port
const PORT = process.env.PORT || 3001;

// to import/run
const fs = require('fs');
const path = require('path');
const express = require('express');

// to initialize
const app = express();

const allNote = require('./db/db.json');

// make sure to use these!!! https://expressjs.com/en/api.html app.use, express.urlencoded, express.json, express.static.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// API get
app.get('/api/notes', (req, res) => {
    res.json(allNote.slice(1));
});

// HTML routes, to get the html to link and work...
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});
// end get

//API route - post/new
function createNew(body, noteArray) {
  const newNote = body;
  if (!Array.isArray(noteArray))
    noteArray = [];
  if (noteArray.length === 0)
    noteArray.push(0);
  body.id = noteArray[0];
  noteArray[0]++;

  noteArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(noteArray, null, 2)
  );
  return newNote;
};

app.post('/api/notes', (req, res) => {
  const newNote = createNew(req.body, allNote);
  res.json(newNote);
});
// end post/new 

//API route - delete
function deleteNote(id, noteArray) {
  for (let i = 0; i < noteArray.length; i++) {
    let note = noteArray[i];

    if (note.id == id) {
      noteArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(noteArray, null, 2)
      );

      break;
    }
  }
};

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNote);
    res.json(true);
});
// end delete

// to link/listen to the port...
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});