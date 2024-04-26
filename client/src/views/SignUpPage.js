import AuthenticationNavbar from "../components/AuthenticationNavbar";
import SignUpForm from "../components/SignUpForm";
import './SignUpPage.css'
import AppLogo from "../components/AppLogo";
function SignUpPage(){
    return(
        <div>
            <AuthenticationNavbar/>
            <SignUpForm class='sign-up-form'/>
            <AppLogo/>
        </div>
    );
}

export default SignUpPage;