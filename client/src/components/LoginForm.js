import './LoginForm.css'
import {useState} from "react";
import {useLogin} from "../hooks/useLogin";
import {useNavigate} from "react-router-dom";
import eyeOpen from '../assets/eye_open.png'
import eyeClosed from '../assets/eye_closed.png'

function LoginForm(props) {
    const navigate = useNavigate()
    const {login, error, isLoading} = useLogin()
    const [error2, setError2] = useState(null)

    const handleSubmit =  async (e) => {
        e.preventDefault()
        if(email.trim() === "" || password.trim() === ""){
            setError2("All fields must be filled")
            return
        }
        setError2(error)
        const success = await login(email, password)
        if(success) {
            navigate('/home')
        }
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const passwordVisibilityHandler = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div className='log-in'>
            <div className='log-in-container'>
                <div className='form-heading'>Login</div>
                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <label form="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Password</label>
                        <div  className="login-password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <img src={showPassword ? eyeOpen : eyeClosed} className="password-visibility-icon" onClick={passwordVisibilityHandler}/>
                        </div>
                        <button type="submit" disabled={isLoading}>Login</button>
                        <div className="errors">
                            {!error2 && error &&
                                <div className="error">{error}</div>}
                            {error2 &&
                                <div className="error">{error2}</div>}
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default LoginForm;
