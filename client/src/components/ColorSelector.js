import './ColorSelector.css'
import {useContext, useEffect, useState} from "react";
import NoteDataContext from "../Contexts/NoteDataContext";
import ActiveNoteContext from "../Contexts/ActiveNoteContext";


function ColorSelector (props) {
    const activeNote = useContext(ActiveNoteContext)
    const [ Color ] = useState(activeNote ? activeNote.color : "")
    const noteId = useState(activeNote ? activeNote._id : "")
    const style = {
        background: Color
    }
    const handleClick = () => {
        props.showColorPalette ? props.deactivateColorPalette() : props.activateColorPalette()
    }
    const setColor = async (color) => {
        props.setColor(color)
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