const Note = require("../models/Note")
const User = require("../models/User")

const noteController = {
    getAllNotes: async (req, res) => {
        const user_id = req.user._id
        try {
            const allNotes = await Note.find({user_id: user_id})
            return res.status(201).json({notes: allNotes});
        } catch (error) {
            return res.status(404).json({msg: "unable to retrieve the notes"})
        }

    },
    getNoteById: async (req, res) => {
        const noteId = req.params.id
        const user_id = req.user._id
        try {
            const fetchedNote  = await Note.findOne({_id: noteId, user_id: user_id})
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
            const user_id = req.user._id
            const newNote = await new Note({...req.body, user_id});
            await newNote.save()
            return res.status(200).json({msg:"new note successfully created"})
        } catch (error) {
            return res.status(400).json({msg:error})
        }
    },

    updateNote: async (req, res) => {
        const userId = req.user._id
        const noteId = req.params.id
        const updatedFields = req.body
        try {
            const updatedNote = await Note.findOneAndUpdate(
                { _id: noteId, user_id: userId },
                updatedFields,
                { new: true }
            );
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
        const userId = req.user._id
        try {
            const note = await Note.findOneAndDelete({ _id: noteId, user_id: userId });
            if (note) {
                return res.status(200).json({msg: "Note successfully deleted"})
            }
            return res.status(404).json({msg: `failed to find the note with id ${noteId} and user_id ${userId}`})
        } catch (error) {
            return res.status(500).json({msg: "failed to delete the note"})
        }
    },
    deleteAllNotes: async (req, res) => {
        const userId = req.user._id
        try {
            const result = await Note.deleteMany({user_id: req.user._id});
            if(result) {
                return res.status(200).json({msg: "all notes successfully deleted"})
            }
            return res.status(404).json({msg: "failed to delete all the notes"})
        } catch (error) {
            console.error('Error deleting documents:', error);
            return res.status(500).json({msg: "an error occurred while deleting the notes"});
        }
    }
}

module.exports = noteController;