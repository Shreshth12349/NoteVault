import './LoginForm.css'
import {useState} from "react";
import {useLogin} from "../hooks/useLogin";
import {useNavigate} from "react-router-dom";

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
                        <label for="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
