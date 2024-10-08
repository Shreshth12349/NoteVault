const mongoose = require('mongoose');

const Schema  = mongoose.Schema

const noteSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false,
        default: "#F9E897"
    },
    user_id: {
        type: String,
        required: true,
    }
});

const Note = mongoose.model('Note', noteSchema)

module.exports = Note;
