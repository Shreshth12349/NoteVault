const express = require('express');
const Note = require("../models/Note");
const router = express.Router();
const noteController = require('../controllers/notesController')

//get all notes
router.get('/', noteController.getAllNotes );

// get note by id
router.get('/:id', noteController.getNoteById);

//create new note
router.post('/', noteController.createNote );

//update note
router.put('/:id', noteController.updateNote )

//delete by id
router.delete('/:id', noteController.deleteNoteById)

//delete all
router.delete('/', noteController.deleteAllNotes)

module.exports = router;
