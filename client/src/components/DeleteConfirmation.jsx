import './DeleteConfirmation.css';
import useNoteDelete from "../hooks/useDeleteNote";
import {useContext} from "react";
import activeNoteContext from "../Contexts/ActiveNoteContext";
import NotesContext from "../Contexts/NotesContext";

function DeleteConfirmation(props) {
    const { fetchNotes } = useContext(NotesContext)
    const { deleteNote, isLoading, error } = useNoteDelete();
    const { activeNote, setActiveNote } = useContext(activeNoteContext)

    const noClickHandler = () => {
        console.log("delete cancelled")
        props.cancelConfirmation();
    };

    const yesClickHandler = async () => {
        const success  =  await deleteNote(props.id)
        console.log("note successfully deleted")
        setActiveNote(null)
        fetchNotes()
    }

    return (
        <div className="confirmation-box">
            <div className="confirmation-message">Delete note?</div>
            <div className="options">
                <div className="confirmation-buttons">
                    <div className="confirmation-button no" onClick={noClickHandler}>Cancel</div>
                    <div className="confirmation-button yes" onClick={yesClickHandler}>Delete</div>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmation;
