import './LandingPage.css'
import LandingPageNavbar from "../components/LandingPageNavbar";
import AppLogo from "../components/AppLogo";
function LandingPage(){
    return(
        <div>
            <LandingPageNavbar/>
            <AppLogo/>
        </div>
    );
}

export default LandingPage;