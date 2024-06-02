import NotesSection from "../components/NotesSection";
import './HomePage.css'
import NoteCreator from "../components/NoteCreator";
import React, {createContext, useEffect, useState} from "react";
import NotesContext from "../Contexts/NotesContext";
import NoteCardEditMode from "../components/NoteCardEditMode";
import Sidebar from "../components/Sidebar";
import ActiveNoteContext from "../Contexts/ActiveNoteContext";
import Navbar from "../components/Navbar";
import {useAuthContext} from "../hooks/useAuthContext";

function HomePage() {
    const [notes, setNotes] = useState([]);
    const [loadingAuth, setLoadingAuth] = useState(true); // New state to track authentication loading
    const [error, setError] = useState(null);
    const [loadingNotes, setLoadingNotes] = useState(true); // New state to track notes loading
    const [activeNote, setActiveNote] = useState(null);
    const [isBlurred, setIsBlurred] = useState(false);
    const { authState, loading } = useAuthContext();
    const { user } = authState;

    const fetchNotes = async () => {
        if (user && user.token) {
            try {
                const response = await fetch('http://localhost:8080/notes', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch notes');
                }
                const data = await response.json();
                setNotes(data.notes);
                setLoadingNotes(false);
            } catch (error) {
                setError(error);
                setLoadingNotes(false);
            }
        }
    };

    const handleNoteAdded = async () => {
        await fetchNotes();
    };

    const handleNoteUpdate = async () => {
        await fetchNotes();
    };

    useEffect(() => {
        if(!loading && user, user.token) {
            fetchNotes();
        }
    }, [user, loading]);

    useEffect(() => {
        const { user } = authState;
        if (user) {
            setLoadingAuth(false); // Set loadingAuth to false when user is available
        }
    }, [authState]); // Watch for changes in authState

    const closeButtonClicked = async () => {
        setActiveNote(null);
        await handleNoteUpdate();
    };

    if (loadingAuth) {
        return <div>Loading authentication...</div>;
    }

    return (
        <NotesContext.Provider value={notes}>
            <div className='home'>
                <Navbar/>
                <div className={`home ${isBlurred ? 'blurred' : ''}`}>
                    <NoteCreator onNoteAdded={handleNoteAdded}/>
                    {loadingNotes ? (
                        <div>Loading notes...</div>
                    ) : (
                        <NotesSection
                            selectedNote={activeNote}
                            setActiveNote={setActiveNote}
                            isBlurred={isBlurred}
                            setIsBlurred={setIsBlurred}
                        />
                    )}
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

export default HomePage
