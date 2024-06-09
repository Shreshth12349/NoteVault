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
import baseUrl from "../config";

function HomePage(props) {
    const [notes, setNotes] = useState([]);
    const [loadingAuth, setLoadingAuth] = useState(true); // New state to track authentication loading
    const [error, setError] = useState(null);
    const [loadingNotes, setLoadingNotes] = useState(true); // New state to track notes loading
    const [activeNote, setActiveNote] = useState(null);
    const [isBlurred, setIsBlurred] = useState(false);
    const { authState, loading } = useAuthContext();
    const { user } = authState;

    const fetchNotes = async () => {
        console.log("user: ", props.token)
        if (user && user.token) {
            try {
                const response = await fetch(`${baseUrl}/notes`, {
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
        const fetchNotesWithRetry = async (retryCount = 5) => {
            if (retryCount === 0) return;
            try {
                await fetchNotes();
            } catch (error) {
                setTimeout(() => fetchNotesWithRetry(retryCount - 1), 1000);
            }
        };

        if (!loading && user) {
            fetchNotesWithRetry();
        }
    }, [user, loading, user.token]);

    useEffect(() => {
        const { user } = authState;
        if (user) {
            setLoadingAuth(false); // Set loadingAuth to false when user is available
        }
    }, [authState, user, loading]); // Watch for changes in authState


    if (loadingAuth) {
        return <div>Loading authentication...</div>;
    }

    return (
        <NotesContext.Provider value={{notes, fetchNotes}}>
            <div className='home'>
                <Navbar/>
                <div className={`home ${activeNote ? 'blurred' : ''}`}>
                    <NoteCreator onNoteAdded={handleNoteAdded}/>
                    {loadingNotes ? (
                        <div style={{color: 'white'}}>Loading notes...</div>
                    ) : (
                        <NotesSection
                            selectedNote={activeNote}
                            setActiveNote={setActiveNote}
                            isBlurred={isBlurred}
                            notes={notes}
                            setIsBlurred={setIsBlurred}
                        />
                    )}
                </div>
                {activeNote && (
                    <ActiveNoteContext.Provider value={{ activeNote, setActiveNote }}>
                        <NoteCardEditMode
                            className="active-note-card"
                            handleNoteUpdate={handleNoteUpdate}
                        />
                    </ActiveNoteContext.Provider>
                )}
            </div>
        </NotesContext.Provider>
    );
}

export default HomePage
