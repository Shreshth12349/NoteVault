import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";

function AuthenticationNavbar(){
    const styles={
        width: '100%',
            height: '3rem',
            background: '#153B50',
            position: 'absolute',
            display: 'flex',
            flexFlow: 'row',
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: 'flex-end'
    }
    return (
        <div>
            <div style={styles}>
                <LoginButton className='login'/>
                <SignUpButton/>
            </div>
        </div>
    );
}

export default AuthenticationNavbar;