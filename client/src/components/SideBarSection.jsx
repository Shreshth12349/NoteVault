import {Link} from "react-router-dom";

function SideBarSection (props) {
    const style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        color: "black",
        border: "1px solid black",
        height: "3rem"
    }
    return (
        <Link to={props.route} style={style}>{props.name}</Link>
    );
}

export default SideBarSection;