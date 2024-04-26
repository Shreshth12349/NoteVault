import AppLogo from "../components/AppLogo";
import AuthenticationNavbar from "../components/AuthenticationNavbar";
import LoginForm from "../components/LoginForm";

function LoginPage() {
    return(
        <div>
            <div>
                <AppLogo/>
                <AuthenticationNavbar/>
                <LoginForm/>
            </div>
        </div>
    );
}
export default LoginPage;