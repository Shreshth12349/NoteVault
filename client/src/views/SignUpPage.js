import LandingPageNavbar from "../components/LandingPageNavbar";
import SignUpForm from "../components/SignUpForm";
import './SignUpPage.css'
import AppLogo from "../components/AppLogo";
function SignUpPage(){
    return(
        <div>
            <LandingPageNavbar/>
            <SignUpForm class='sign-up-form'/>
            <AppLogo/>
        </div>
    );
}

export default SignUpPage;