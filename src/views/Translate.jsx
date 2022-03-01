import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import TranslationForm from "../components/Translation/TranslationForm";
const Translate = () => {
    
    const storage = window.localStorage;
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Translate";
        if(storage.getItem("username") === null) navigate("/")
    }, []);
    
    return (
        <>
            <Navbar />
            <h1>Translate</h1>
            <TranslationForm />
        </>  
    );
}

export default Translate;