import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/user";

const usernameConfig = {
    required: true,
    minLength: 3,
};

const LoginForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [ loading, setLoading ] = useState(false);
    const [ apiError, setApiError] = useState(null);

    const onSubmit = async ({ username }) => {
        setLoading(true);
        const [ error, user ] = await loginUser(username);
        console.log(user);
        if(error !== null ) setApiError(error);
        setLoading(false);
        if(error === null || error === undefined) navigate("/translate")
    };

    const errorMessage = (() => {
        if(!errors.username) return null;
        
        if(errors.username.type === "required") return <span>Username is required</span>;

        if(errors.username.type === "minLength") return <span>Username is too short (min. 3 characters)</span>;
    })();

    return (
        <>
            <h2>What's your name?</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        {...register("username", usernameConfig)}
                        placeholder="Enter username"
                    />
                    { errorMessage }
                </fieldset>

                <button type="submit" disabled={ loading }>Continue</button>
                { loading && <p>Logging in...</p> }
                { apiError && <p>{ apiError }</p> }
            </form>
        </>
    );
};

export default LoginForm;
