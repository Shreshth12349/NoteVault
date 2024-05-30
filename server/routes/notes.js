const express = require('express');
const noteController = require('../controllers/noteController')

const router = express.Router();

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
router.delete('/all', noteController.deleteAllNotes)

module.exports = router;
