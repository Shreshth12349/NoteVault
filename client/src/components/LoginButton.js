import {Link} from "react-router-dom";
function LoginButton(){
    const styles = {
        height: '2.5rem',
        width: '5rem',
        fontSize: '1.2rem',
        marginRight: '10px',
        border: '1px solid black',
        borderRadius: '1.25rem',
        textDecoration: 'none',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        fontWeight: 'bold',
        background: '#2ea646',
        boxShadow: '0px 0px 7px 0px'
    }
    return (
        <Link style={styles} to={'/login'}>Login</Link>
    );
    ;
}

export default LoginButton;