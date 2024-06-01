import {Link} from "react-router-dom";
import './Navbar.css'
import LogoutButton from "./LogoutButton";
function Navbar(){
    return (
        <div className="navbar">
            <div className="app-name">NoteVault</div>
            <LogoutButton className="logout-button"/>
        </div>
    );
}

export default Navbar