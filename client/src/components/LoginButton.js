import {Link} from "react-router-dom";
function LoginButton(){
    const styles = {
        height: '2rem',
        width: '5rem',
        fontSize: '1rem',
        marginRight: '10px',
        border: '2px solid black',
        borderRadius: '1rem',
        textDecoration: 'none',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        fontWeight: 'bold',
        background: '#429EA6'
    }
    return (
        <Link style={styles} to={'/login'}>Login</Link>
    );
    ;
}

export default LoginButton;