import './SignUpForm.css'
import {useState} from "react";
function SignUpForm(props) {

    const handleSubmit =  (e) => {
        e.preventDefault()
        console.log(email, password)
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    return (
        <div className='sign-up'>
            <div className='sign-up-container'>
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
                        <label for="confirmPassword">Confirm password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e)=> setConfirmPassword(e.target.value)}
                        />
                        <button type="submit">Sign up</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default SignUpForm;
