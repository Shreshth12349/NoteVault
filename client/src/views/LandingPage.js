import './LandingPage.css'
import AuthenticationNavbar from "../components/AuthenticationNavbar";
import AppLogo from "../components/AppLogo";
function LandingPage(){
    return(
        <div>
            <AuthenticationNavbar/>
            <AppLogo/>
        </div>
    );
}

export default LandingPage;