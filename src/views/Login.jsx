import { useEffect } from "react";
import LoginForm from "../components/Login/LoginForm";
import Navbar from "../components/Navbar/Navbar";

const Login = () => {
    useEffect(() => {
        document.title = "Login";
    }, []);
    
    return (
        <>
            <Navbar />
            <LoginForm />
        </>
    );
}

export default Login;