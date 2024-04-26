import { useForm } from "react-hook-form";
import './SignUpForm.css'
function SignUpForm(props) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div className='sign-up'>
            <div className='sign-up-container'>
                <div className='form-heading'>Sign Up</div>
                <div className='form'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label form="username">Username</label>
                        <input
                            type="text"
                            name="username"
                        />
                        <label for="password">Password</label>
                        <input
                            type="password"
                            name="password"
                        />
                        <label for="confirmPassword">Confirm password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                        />
                        <button type="submit">Sign up</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default SignUpForm;
