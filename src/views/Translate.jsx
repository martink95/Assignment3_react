import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import TranslationForm from "../components/Translation/TranslationForm";
const Translate = () => {
    useEffect(() => {
        document.title = "Translate";
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