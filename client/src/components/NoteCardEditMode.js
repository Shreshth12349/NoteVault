import './NoteCardEditMode.css'
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import ColorSelector from "./ColorSelector";
import ActiveNoteContext from "../Contexts/ActiveNoteContext";
import {useAuthContext} from "../hooks/useAuthContext";
import baseUrl from "../config";
import NoteDeleteButton from "./NoteDeleteButton";
import NotesContext from "../Contexts/NotesContext";

function NoteCardEditMode(props) {
    const { activeNote, setActiveNote } = useContext(ActiveNoteContext)
    const [title, setTitle] = useState(activeNote ? activeNote.title : "");
    const [body, setBody] = useState(activeNote ? activeNote.body : "");
    const [color, setColor] = useState(activeNote ? activeNote.color : "");
    const [id, setId] = useState(activeNote ? activeNote._id : "");
    const [showColorPalette, setShowColorPalette] = useState(false)
    const {authState} = useAuthContext()
    const {user} = authState
    const {notes, fetchNotes} = useContext(NotesContext)
    const closeButtonStyle = {
        background: color
    }
    const updateNote = useCallback(async () => {
        if(!user) {
            return
        }
        try {
            const response = await fetch(`${baseUrl}/notes/${id}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, body: body, color: color})
            });
            if (!response.ok) {
                throw new Error('Failed to update note');
            }
            const data = await response.json();
        } catch (error) {
            console.error('Error updating note:', error);
        }
    }, [title, body, color, id]);

    const handleTitleChange =  (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
    };

    const handleBodyChange =  (e) => {
        const newBody = e.target.value;
        setBody(newBody);
    };
    const closeButtonClickHandler = async () => {
        await updateNote()
        fetchNotes()
        setActiveNote(null)
    }
    const activateColorPalette = () => {
        setShowColorPalette(true)
    }
    const deactivateColorPalette = () => {
        setShowColorPalette(false)
    }

    const style = {
        background: color,
    }

    useEffect(() => {
        const handleKeyDown = async (event) => {
            if (event.key === 'Escape') {
                await updateNote()
                setActiveNote(null)
                fetchNotes()
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [updateNote]);


    return (
        <div className='active-note' id={id} style={style}>
            <textarea
                placeholder={"Title"}
                className="active-note-title"
                value={title}
                onChange={(e) => handleTitleChange(e)}
                name="active-note-title"
            />
            <textarea
                placeholder={"Note"}
                className="active-note-body"
                value={body}
                onChange={(e) => handleBodyChange(e)}
                name="active-note-body"
            />
            <div className="close-edit-mode-button" onClick={closeButtonClickHandler} style={closeButtonStyle}>Close</div>
            <ColorSelector
                showColorPalette={showColorPalette}
                activateColorPalette={activateColorPalette}
                deactivateColorPalette={deactivateColorPalette}
                setColor={setColor}
                activeColor={color}
            />
            <NoteDeleteButton class="delete-button" color={color} id={id}/>
        </div>
    );
}

export default NoteCardEditMode;
