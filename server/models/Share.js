const mongoose = require('mongoose');

const Schema  = mongoose.Schema

const shareSchema = new Schema({
    endpoint: {
        type: String,
        required: true
    },
    noteId: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true,
    },
});

const Share = mongoose.model('Share', shareSchema)

module.exports = Share
