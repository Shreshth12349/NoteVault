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
        background: '#6b8de3',
        padding: '0 4px',
        boxShadow: '0px 0px 7px 0px'
    }
    return (
        <Link to={"/signup"} style={styles}>Sign up</Link>
    );
}

export default SignUpButton;