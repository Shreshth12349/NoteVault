import React, {useState, useContext, useEffect} from 'react';
import NoteCard from "./NoteCard";
import './NotesSection.css';
import NotesContext from "../Contexts/NotesContext";
import NoteDataContext from "../Contexts/NoteDataContext";

function NotesSection({ selectedNote, setSelectedNote , isBlurred, setIsBlurred}) {
    const notes = useContext(NotesContext);
    const handleNoteCardClick = (note, event) => {
        event.stopPropagation();
        setSelectedNote(note);
    };


    return (
        <div className="notes-section">
            {notes?.map((note, index) => (
                <NoteDataContext.Provider key={note.id} value={note}>
                    <NoteCard onClick={(event) => handleNoteCardClick(note, event)}  />
                </NoteDataContext.Provider>
            ))}
        </div>
    );
}

export default NotesSection;
