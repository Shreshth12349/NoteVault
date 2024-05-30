import {Link} from "react-router-dom";

function SignUpButton(){
    const styles = {
        height: '2rem',
        width: '5rem',
        fontSize: '1rem',
        marginRight: '10px',
        border: '1px solid black',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        color: 'black',
        fontWeight: 'bold',
        background: '#429EA6'
    }
    return (
        <Link to={"/signup"} style={styles}>Sign up</Link>
    );
}

export default SignUpButton;