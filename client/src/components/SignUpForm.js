import './SignUpForm.css'
import {useState} from "react";
import {useSignup} from "../hooks/useSignup";
function SignUpForm(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password)
        await signup(email, password)
        console.log(error)
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
                        <button type="submit" disabled={isLoading}>Sign up</button>
                        {error &&
                            <div className="error">*{error}*</div>}
                    </form>
                </div>
            </div>
        </div>

    );
}

export default SignUpForm;
