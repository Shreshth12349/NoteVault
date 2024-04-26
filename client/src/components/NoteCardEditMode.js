import './NoteCardEditMode.css'
import { useEffect, useRef, useState } from "react";
import ColorSelector from "./ColorSelector";

function NoteCardEditMode(props) {

    const [title, setTitle] = useState(props.note.title)
    const [body, setBody] = useState(props.note.body)
    const [showColorPalette, setShowColorPalette] = useState(false)
    const [ noteColor, setNoteColor ] = useState(props.note.color)

    const updateNoteTitle = async (id, title) => {
        try {
            console.log(`id = ${id}`)
            const response = await fetch('http://localhost:5000/notes/title', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, title })
            });
            if (!response.ok) {
                throw new Error('Failed to update note title');
            }
            const data = await response.json();

            console.log('Note updated successfully:', data);
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };
    const updateNoteBody = async (id, body) => {
        try {
            console.log(`id = ${id}`)
            const response = await fetch('http://localhost:5000/notes/body', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, body })
            });
            if (!response.ok) {
                throw new Error('Failed to update note body');
            }
            const data = await response.json();

            console.log('Note updated successfully:', data);
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };
    const handleTitleChange = async (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        await updateNoteTitle(props.note.id, newTitle);
    };

    const handleBodyChange = async (e) => {
        const newBody = e.target.value;
        setBody(newBody);
        await updateNoteBody(props.note.id, newBody);
    };
    const closeButtonClickHandler = async () => {
        await updateNoteTitle()
        await updateNoteBody()
        props.closeButtonClicked()
    }
    const activateColorPalette = () => {
        setShowColorPalette(true)
    }
    const deactivateColorPalette = () => {
        setShowColorPalette(false)
    }

    const style = {
        background: noteColor,
    }
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                updateNoteTitle()
                updateNoteBody()
                props.setActiveNote(null)
                props.handleNoteUpdate()
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className='active-note' id={props.note.id} style={style}>
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
            <div className="close-button" onClick={closeButtonClickHandler}>Close</div>
            <ColorSelector
                showColorPalette={showColorPalette}
                activateColorPalette={activateColorPalette}
                deactivateColorPalette={deactivateColorPalette}
                setNoteColor={setNoteColor}
                noteId = {props.note.id}
                color={props.note.color}
            />
        </div>
    );
}

export default NoteCardEditMode;
