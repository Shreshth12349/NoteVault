import './ShareMenu.css'
import copyIcon from '../assets/copy_icon.png'
import {useReducer, useRef, useState} from "react";
import apiUrl from "../config";
import {authReducer} from "../Contexts/AuthContext";
import {useAuthContext} from "../hooks/useAuthContext";

function ShareMenu (props) {
    const {authState} = useAuthContext()
    const {user} = authState
    const [copySuccess, setCopySuccess] = useState(false)
    const accessLinkRef = useRef('accessLink')
    const clientUrl = window.location.origin;
    const [currentlySharing, setCurrentlySharing] = useState(true)
    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(accessLinkRef.current.value)
        setCopySuccess(true)
        setTimeout(() => {
            setCopySuccess(false)
        }, 1500)
    }

    const handleStartSharing = async () => {
        props.handleStartShare()
        setCurrentlySharing(true)
    }

    const handleStopSharing = async () => {
        const url = `${apiUrl}/share/${props.noteId}`
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setCurrentlySharing(false)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            <div className="share-menu-container">
                {currentlySharing && (
                    <div className="link-container">
                    <textarea
                        value={`${clientUrl}/share/${props.accessLink}`}
                        className="link-textbox"
                        readOnly={true}
                        ref={accessLinkRef}
                    />
                        <div className="copy-button" onClick={handleCopyLink}>
                            <img src={copyIcon} className="copy-icon" />
                        </div>
                    </div>
                )}
                {currentlySharing && (
                    <button className="stop-sharing-button" onClick={handleStopSharing}>
                        Stop sharing
                    </button>
                )}
                {!currentlySharing &&
                    <div onClick={handleStartSharing} className={"start-sharing-button"}>Create access link</div>
                }
            </div>
            {copySuccess && (
                <div className="copy-success-message">Link copied to clipboard</div>
            )}
        </div>
    )
}

export default ShareMenu