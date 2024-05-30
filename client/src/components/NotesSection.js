import React, { useContext } from 'react';
import NoteCard from "./NoteCard";
import './NotesSection.css';
import NotesContext from "../Contexts/NotesContext";
import NoteDataContext from "../Contexts/NoteDataContext";

function NotesSection(props) {
    const notes = useContext(NotesContext);

    const handleNoteCardClick = (note, event) => {
        props.setActiveNote(note);
        event.stopPropagation();
    };

    return (
        <div className="notes-section">
            {notes.slice().reverse().map((note, index) => (
                <NoteDataContext.Provider key={note._id} value={note}>
                    <NoteCard onClick={(event) => handleNoteCardClick(note, event)} />
                </NoteDataContext.Provider>
            ))}
        </div>
    );

}

export default NotesSection;
