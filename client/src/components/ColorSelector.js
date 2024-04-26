import './ColorSelector.css'
import {useContext, useState} from "react";
import NoteDataContext from "../Contexts/NoteDataContext";
function ColorSelector (props) {
    const [ noteColor, setNoteColor ] = useState(props.color)
    const noteId = props.noteId;
    const style = {
        background: noteColor
    }
    const handleClick = () => {
        props.showColorPalette ? props.deactivateColorPalette() : props.activateColorPalette()
    }
    const setColor = async (color) => {
        try {
            props.setNoteColor(color)
            setNoteColor(color)
            props.deactivateColorPalette()
            const response = await fetch('http://localhost:5000/notes/color',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id:noteId, color })
            });
            if (!response.ok) {
                throw new Error('Failed to update note');
            }
        } catch (error) {
            console.error('Error setting color of note:', error);
        }
    }
    return (
        <div className="color-selector">
            {!props.showColorPalette && <div className="color-button" onClick={handleClick} style={style}/>}

            {props.showColorPalette &&
                <div className="palette">
                    <div id="tile1" className="color-tiles" onClick={() => setColor('#D37676')}/>
                    <div id="tile2" className="color-tiles" onClick={() => setColor('#7F9F80')}/>
                    <div id="tile3" className="color-tiles" onClick={() => setColor('#F9E897')}/>
                    <div id="tile4" className="color-tiles" onClick={() => setColor('#FFC374')}/>
                </div>
            }
        </div>
    );
}

export default ColorSelector;