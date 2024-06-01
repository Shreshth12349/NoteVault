import {Link} from "react-router-dom";

function SignUpButton(){
    const styles = {
        height: '2.5rem',
        width: '5rem',
        fontSize: '1.2rem',
        marginRight: '10px',
        border: '1px solid black',
        borderRadius: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        color: 'black',
        fontWeight: 'bold',
        background: '#429EA6'
    }
    return (
        <Link to={"/signup"} style={styles}>sign up</Link>
    );
}

export default SignUpButton;