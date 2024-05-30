const Note = require("../models/Note");

const noteController = {
    getAllNotes: async (req, res) => {
        try {
            const allNotes = await Note.find({})
            return res.status(201).json({notes: allNotes});
        } catch (error) {
            console.log(error)
            return res.status(404).json({msg: "unable to retrieve the notes"})
        }

    },
    getNoteById: async (req, res) => {
        const noteId = req.params.id
        try {
            const fetchedNote  = await Note.findById(noteId)
            if (fetchedNote) {
                return res.status(201).json({note: fetchedNote});
            } else {
                return res.status(404).json({msg:`note with id ${noteId} not found`})
            }
        } catch (error){
            return res.status(404).json({msg:`failed to find note with id ${noteId}`})
        }
    },

    createNote: async (req, res) => {
        try {
            const newNote = await new Note({...req.body});
            await newNote.save()
            return res.status(200).json({msg:"new note successfully created"})
        } catch (error) {
            console.log(error)
            return res.status(400).json({msg:error})
        }
    },

    updateNote: async (req, res) => {
        const noteId = req.params.id
        const updatedFields = req.body
        try {
            const updatedNote = await Note.findByIdAndUpdate(noteId, updatedFields, { new: true });
            if (updatedNote) {
                return res.status(200).json({msg: "note successfully updated", note: updatedNote})
            }
            return res.status(404).json({msg: `note with id ${noteId} not found`})
        } catch (error) {
            return res.status(500).json({msg: "Unable to update the note"})
        }
    },

    deleteNoteById: async (req, res) => {
        const noteId = req.params.id
        try {
            const deletedNote = await Note.findByIdAndDelete(noteId)
            if (deletedNote) {
                return res.status(200).json({msg: "Note successfully deleted"})
            }
            return res.status(404).json({msg: `failed to find the note with id ${noteId}`})
        } catch (error) {
            return res.status(500).json({msg: "failed to delete the note"})
        }
    },
    deleteAllNotes: async (req, res) => {
        try {
            const result = await Note.deleteMany({});
            if(result) {
                return res.status(200).json({msg: "all notes successfully deleted"})
            }
            return res.status(404).json({msg: "failed to delete the notes"})
        } catch (error) {
            console.error('Error deleting documents:', error);
            return res.status(500).json({msg: "an error occurred while deleting the notes"});
        }
    }
}

module.exports = noteController;