const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const { createNote, notes, getNote, updateNoteBody, updateNoteTitle, updateNoteColor } = require('./data')

const app = express();
app.use(morgan('tiny'))
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());



const port = 5000;


app.get('/', (req, res) => {
    res.send('Hello !');
});


app.get('/notes', (req, res) => {
    return res.status(201).json({notes: notes});
});


app.get('/notes/:id', (req, res) => {
    const noteId = req.params.id
    const fetchedNote  = getNote(Number(noteId))
    if (fetchedNote) {
        return res.status(201).json({note: fetchedNote});
    }
    return res.status(404).json({success: false, msg: `No note found with id ${noteId}`})
});

app.put('/notes/title', (req, res) => {
    const noteId = Number(req.body.id)
    const newTitle = req.body.title
    if(updateNoteTitle(Number(noteId), newTitle)){
        return res.status(200).json({success: true, msg: "Note title updated successfully"})
    }
    return res.status(404).json({success: false, msg: `Note with ${noteId} not found`})
})

app.put('/notes/body', (req, res) => {
    const noteId = Number(req.body.id)
    const newBody = req.body.body
    if(updateNoteBody(Number(noteId), newBody)){
        return res.status(200).json({success: true, msg: "Note body updated successfully"})
    }
    return res.status(404).json({success: false, msg: `Note with ${noteId} not found`})
})


app.post('/notes', (req, res) => {
    createNote(req.body.title, req.body.body);
    res.status(200).send('Request received')
});

app.put('/notes/color', (req, res) => {
    const noteId = Number(req.body.id)
    const newColor = req.body.color
    if(updateNoteColor(Number(noteId), newColor)){
        return res.status(200).json({success: true, msg: "Note color updated successfully"})
    }
    return res.status(404).json({success: false, msg: `Note with ${noteId} not found`})
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

