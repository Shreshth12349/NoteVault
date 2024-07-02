import AppLogo from "../components/AppLogo";
import LandingPageNavbar from "../components/LandingPageNavbar";
import LoginForm from "../components/LoginForm";

function LoginPage() {
    return(
        <div>
            <div>
                <AppLogo/>
                <LandingPageNavbar/>
                <LoginForm/>
            </div>
        </div>
    );
}
export default LoginPage;