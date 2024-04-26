import { useForm } from "react-hook-form";
import './SignUpForm.css'
function LoginForm(props) {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className='sign-up-container'>
            <div className='form-heading'>Login</div>
            <div className='form'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                    />
                    <label>Password</label>
                    <input
                        type="password" // \
                        name="password"
                    />
                    <button type="submit">Log in</button>
                </form>
            </div>

        </div>
    );
}

export default LoginForm;
