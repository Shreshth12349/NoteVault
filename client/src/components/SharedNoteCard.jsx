import apiUrl from '../config';
import { useState, useEffect } from 'react';
import './SharedNoteCard.css'
import invalidLinkIcon from '../assets/invalid_link_icon.png'
function SharedNoteCard(props) {
    const endpoint  = props.endpoint
    const [sharedNote, setSharedNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = `${apiUrl}/share/${endpoint}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setSharedNote(data.share);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error);
                setLoading(false);
            });
    }, [endpoint]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // if (error.status === 404) {
    //     return <div className={"invalid-link-message"}>Invalid access Link</div>;
    // }

    // if (!sharedNote) {
    //     console.log("invalid access link")
    //     return <div className={"invalid-link-message"}>Invalid access Link</div>;
    // }

    return (
        <div className={"shared-note-container"}>
            {sharedNote &&
                <div className="shared-note-card">
                    <div className="shared-note-title">{sharedNote.title === "" ? "No title" : sharedNote.title}</div>
                    <div className="shared-note-body">{sharedNote.body}</div>
                </div>
            }
            { !sharedNote &&
                <div className={"invalid-link-message"}>
                    <div className={"invalid-link-text"}>
                        <div className={"invalid-link-title"}>Invalid access Link</div>
                        <div className={"invalid-link-body"}>The link you are using is invalid</div>
                    </div>
                    <img src={invalidLinkIcon} className={"invalid-link-icon"}/>
                </div>
            }

        </div>
    );
}

export default SharedNoteCard;
