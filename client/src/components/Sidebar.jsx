import SideBarSection from "./SideBarSection";
import './SideBar.css'
import {useState} from "react";
function Sidebar () {
    const [ isOpen, setIsOpen ] = useState(false)

    const handleHover = () => {
        setIsOpen(true)
    }
    return (
        <div className="side-bar-frame">
            <div className="side-bar-holder" onMouseEnter={handleHover}></div>
            <div className={`side-bar ${isOpen ? 'open' : ''}`} >
                <SideBarSection className="sidebar-section" name="Profile" route="/login"/>
                <SideBarSection className="sidebar-section" name="Manage" route="/signup"/>
                <SideBarSection className="sidebar-section" name="Trash" route="/home"/>
                <SideBarSection className="sidebar-section" name="Keep" route="/home"/>
                <SideBarSection className="sidebar-section" name="Refresh" route="/home"/>
                <SideBarSection className="sidebar-section" name="Edit" route="/home"/>
            </div>
        </div>

    );
}

export default Sidebar;