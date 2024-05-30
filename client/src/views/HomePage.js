import NotesSection from "../components/NotesSection";
import './HomePage.css'
import NoteCreator from "../components/NoteCreator";
import React, {createContext, useEffect, useState} from "react";
import NotesContext from "../Contexts/NotesContext";
import NoteCardEditMode from "../components/NoteCardEditMode";
import Sidebar from "../components/Sidebar";
import ActiveNoteContext from "../Contexts/ActiveNoteContext";

function HomePage() {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeNote, setActiveNote] = useState(null);
    const [isBlurred, setIsBlurred] = useState(false);


    const fetchNotes = async () => {
        try {
            const response = await fetch('http://localhost:8080/notes');
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
            const data = await response.json();
            setNotes(data.notes);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching notes:', error);
            setError(error);
            setLoading(false);
        }
    };

    const handleNoteAdded = async () => {
        await fetchNotes();
    };
    const handleNoteUpdate = async () => {
        await fetchNotes();
    };

    useEffect(() => {
        setIsBlurred(activeNote !== null);
        const handleClickOutside = (event) => {
            const activeNoteCard = document.querySelector('.active-note-card');
            // Check if the clicked element is not the active note or a descendant of the active note
            if (
                activeNote &&
                activeNoteCard &&
                // activeNoteCard.contains(event.target) === false &&
                !event.target.closest('.active-note-card')
            ) {
                setActiveNote(null);
                console.log('background clicked');
            }
        };
        if (activeNote) {
            document.addEventListener('click', handleClickOutside);

            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [activeNote]);

    useEffect(() => {
        fetchNotes();
    }, []);



    useEffect(() => {
        setIsBlurred(activeNote !== null);
        const handleClickOutside = (event) => {
            const activeNoteCard = document.querySelector('.active-note-card');
            if (
                activeNote &&
                activeNoteCard &&
                !event.target.closest('.active-note-card') &&
                !event.target.closest('.note-card-edit-mode')
            ) {
                setActiveNote(null);
                console.log('background clicked');
            }
        };
        if (activeNote) {
            document.addEventListener('click', handleClickOutside);

            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [activeNote]);

    const closeButtonClicked = async () => {
        setActiveNote(null)
        await handleNoteUpdate()
    }

    return (
        <NotesContext.Provider value={notes}>
            <div className='home'>
                <div className={`home ${isBlurred ? 'blurred' : ''}`}>
                    <NoteCreator onNoteAdded={handleNoteAdded}/>
                    <NotesSection
                        selectedNote={activeNote}
                        setActiveNote={setActiveNote}
                        isBlurred={isBlurred}
                        setIsBlurred={setIsBlurred}
                    />
                </div>
                {activeNote && (
                    <ActiveNoteContext.Provider value={{ activeNote }}>
                        <NoteCardEditMode
                            className="active-note-card"
                            closeButtonClicked={closeButtonClicked}
                            setActiveNote={setActiveNote}
                            handleNoteUpdate={handleNoteUpdate}
                        />
                    </ActiveNoteContext.Provider>
                )}
            </div>
        </NotesContext.Provider>
    );
}

export default HomePage;
