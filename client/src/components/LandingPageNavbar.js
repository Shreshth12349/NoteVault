import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";
import './LandingPageNavbar.css'
function LandingPageNavbar(){
    const styles={

    }
    return (
        <div>
            <div className="nav">
                <div className="index-name">NoteVault</div>
                <div className="buttons">
                    <LoginButton className='login'/>
                    <SignUpButton/>
                </div>
            </div>
        </div>
    );
}

export default LandingPageNavbar;