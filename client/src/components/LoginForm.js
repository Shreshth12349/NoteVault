import './LoginForm.css'
import {useState} from "react";
function LoginForm(props) {

    const handleSubmit =  (e) => {
        e.preventDefault()
        console.log(email, password)
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    return (
        <div className='log-in'>
            <div className='log-in-container'>
                <div className='form-heading'>Sign Up</div>
                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <label form="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                        <label for="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                        <button type="submit">Sign up</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default LoginForm;
