import bin from '../assets/bin_icon.png';
import './NoteDeleteButton.css'
import {useNoteDelete} from "../hooks/useDeleteNote";
import DeleteConfirmation from "./DeleteConfirmation";
import {useState} from "react";

function NoteDeleteButton(props) {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const { deleteNote, isLoading, error } = useNoteDelete();

    const handleDelete = async () => {
        const success = await deleteNote(props.activeNote.id);
        if (success) {
            console.log("Note deleted successfully");
        } else {
            console.error("Failed to delete note");
        }
    };
    const handleClick = () => {
        setShowDeleteConfirmation(!showDeleteConfirmation)
        console.log("Set to show")
    }
    const cancelConfirmation = () => {
        setShowDeleteConfirmation(false)
        console.log("Set to hide")
    }
    const styles = {
        background: props.color
    }
    return (
        <div>
            <div className="delete-container" style={styles} onClick={handleClick}>
                <img src={bin} alt="Delete note" className="delete-icon"/>
            </div>
            {showDeleteConfirmation &&
                <DeleteConfirmation cancelConfirmation={cancelConfirmation} id={props.id}/>
            }
        </div>

    )
}

export default NoteDeleteButton;