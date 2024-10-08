import "./NoteCreator.css";
import {useState, useRef, useEffect, useContext} from "react";
import {useAuthContext} from "../hooks/useAuthContext";
import apiUrl from "../config";
import NotesContext from "../Contexts/NotesContext";

function NoteCreator() {

    const titleRef = useRef(null)
    const bodyRef = useRef(null)
    const [ Focus, setFocus ] = useState(false)
    const handleBodyFocus = () => { setFocus(true)}
    const {fetchNotes} = useContext(NotesContext)

    const resetInputArea = () => {
        setFocus(false);
        titleRef.current.style.height = ""
        bodyRef.current.style.height = ""
        titleRef.current.value = ""
        bodyRef.current.value = ""
    }
    const {authState} = useAuthContext()
    const {user} = authState

    const createNote = async (title, body) => {
        if(!user) {
            return false
        }
        try {
            const response = await fetch(`${apiUrl}/notes`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({title, body}),
            });
            if (response.ok) {
                resetInputArea()
                    fetchNotes()
            } else {
                console.error("Failed to save note:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    const handleBlur = async () => {
        setTimeout(() => {
            if ((document.activeElement !== titleRef.current) && (document.activeElement !== bodyRef.current) ) {
                checkFields()
            } else if(document.activeElement === titleRef.current && bodyRef.current.value.trim() === ""){
                bodyRef.current.style.height = "";
            } else if(document.activeElement === bodyRef.current && titleRef.current.value.trim() === ""){
                titleRef.current.style.height = "";
            }
        }, 0);
    }


    const checkFields = async () => {
        let title = titleRef.current.value
        let body = bodyRef.current.value
        if((title.trim()) !== "" || (body.trim() !== "")) {
            await createNote(title, body)
        } else { resetInputArea() }
    }

    const handleChange = (event) => {
        const inputField = event.target;
        inputField.style.height = "auto";
        const newHeight = inputField.scrollHeight * 2
        inputField.style.height = newHeight + "px";
    };

    const closeButtonClickHandler = async () => {
        setFocus(false)
    }

    useEffect(() => {
        const handleKeyDown = async (event) => {
            if (event.key === 'Escape') {
                await checkFields();
                setFocus(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return (
        <div>
            <form>
                <div className="input-area ${Focus ? 'focus' : ''}`">
                    <textarea
                        placeholder="Title"
                        ref={titleRef}
                        className="note-title-input"
                        style={{display: Focus ? "block" : "none"}}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="note-creator-title"
                    />
                    <textarea
                        placeholder="Take a note..."
                        ref={bodyRef}
                        className="note-body-input"
                        onFocus={handleBodyFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="note-creator-body"
                    />
                    {Focus && <div className="close-note-creator-button" onClick={closeButtonClickHandler}>Close</div>}

                </div>

            </form>
        </div>
    );
}

export default NoteCreator;
