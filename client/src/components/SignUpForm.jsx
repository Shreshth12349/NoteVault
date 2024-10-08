import './SignUpForm.css'
import {useEffect, useState} from "react";
import {useSignup} from "../hooks/useSignup";
import eyeOpen from "../assets/eye_open_icon.png";
import eyeClosed from "../assets/eye_closed_icon.png";

function SignUpForm(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const {signup, error, isLoading} = useSignup()
    const [error2, setError2] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const passwordVisibilityHandler = () => {
        setShowPassword(!showPassword)
    }
const confirmPasswordVisibilityHandler = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password!==confirmPassword) {
            setError2("Passwords don't match")
            return
        }
        setError2(null)
        await signup(email, password)
    }


    return (
        <div className='sign-up'>
            <div className='sign-up-container'>
                <div className='form-heading'>Sign Up</div>
                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <label form="Email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                        <label>Password</label>
                        <div className="signup-password-container">
                            <input
                                type={showPassword ? "text" : "password"}                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <img src={showPassword ? eyeOpen : eyeClosed} className="password-visibility-icon" onClick={passwordVisibilityHandler}/>
                        </div>
                        <label>Confirm password</label>
                        <div className="signup-password-container">
                            <input
                                type={showConfirmPassword ? "text" : "password"}                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <img src={showConfirmPassword ? eyeOpen : eyeClosed} className="password-visibility-icon" onClick={confirmPasswordVisibilityHandler}/>
                        </div>
                        <button type="submit" disabled={isLoading}>Sign up</button>
                        <div className="errors">
                        {!error2 && error &&
                                <div className="error">{error}</div>}
                            {error2 &&
                                <div className="error">{error2}</div> }
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default SignUpForm;
