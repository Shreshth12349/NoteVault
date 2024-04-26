import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import './NoteCard.css'
import NoteDataContext from "../Contexts/NoteDataContext";

function NoteCard (props) {
    const note = useContext(NoteDataContext)
    const style = { background: note.color }
    return (
        <div className='note-container' id={note.id} onClick={props.onClick} style={style}>
            {note.title && <div className="note-title">{note.title}</div>}
            {note.body && <div className="note-body">{note.body}</div>}
            {!note.body && !note.title &&  <div className="empty-placeholder">Empty Note</div>}
        </div>
    );
}

export default NoteCard;
