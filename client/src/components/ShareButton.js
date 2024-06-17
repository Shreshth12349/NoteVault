import shareIcon from '../assets/share_icon.png'
import './ShareButton.css'
import {useState} from "react";
import ShareMenu from "./ShareMenu";
import {useAuthContext} from "../hooks/useAuthContext";
import apiUrl from "../config";

function ShareButton(props) {
    const styles = {
        background: props.color
    }
    const [accessLink, setAccessLink] = useState(null)
    const {authState} = useAuthContext()
    const {user} = authState
    const [showShareMenu, setShowShareMenu] = useState(false)
    const clientUrl = window.location.origin;
    const handleStartShare = () => {
        const url = `${apiUrl}/share/${props.noteId}`
        fetch(url, {
            method: 'POST',
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
                setAccessLink(data.share.endpoint)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const toggleShareMenu = () => {
        handleStartShare()
        setShowShareMenu(!showShareMenu)
    }
    return (
        <div>
            <div className="share-icon-container" style={styles} onClick={toggleShareMenu}>
                <img src={shareIcon} className="share-icon"/>
            </div>
            {showShareMenu && <ShareMenu className={"share-menu"} accessLink={accessLink} noteId={props.noteId} handleStartShare={handleStartShare}/>}
        </div>
    )
}

export default ShareButton