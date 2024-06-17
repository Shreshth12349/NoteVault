import LandingPageNavbar from "../components/LandingPageNavbar";
import SharedNoteCard from "../components/SharedNoteCard";
import {useParams} from "react-router-dom";
import './SharedNoteViewPage.css'

function SharedNoteViewPage () {
    const {endpoint} = useParams()
    return (
        <div className={"shared-note-view"}>
            <LandingPageNavbar/>
            <SharedNoteCard endpoint={endpoint}/>
        </div>
    )
}

export default SharedNoteViewPage