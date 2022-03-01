import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { deleteAllTranslations } from "../api/user";
import Navbar from "../components/Navbar/Navbar";
import TranslationItem from "../components/Translation/TranslationItem";
const Profile = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const storage = window.localStorage;
    const navigate = useNavigate();
    let translations = storage.getItem("translations").split(",").reverse();

    let translationsExists = false;
    let lastTranslations = []
    console.log(translations.values.length);
    if(translations.length > 0 && translations[0] !== "") {
        for(let i = 0; i < 10 ; i++) {
            lastTranslations.push(translations[i]);
        }
        translationsExists = true;
    }
    

    useEffect(() => {
        document.title = "Profile";
        if(storage.getItem("username") === null) navigate("/")
    }, []);

    const translationsHTML = lastTranslations.map((word, index) => {
        return(
            <div className="translation-wrapper" key={index}>
                <TranslationItem input={word}  />
            </div>
        );
    })

    const [ loading, setLoading ] = useState(false);

    const onSubmit = async () => {
        const username = storage.getItem("username");
        setLoading(true);
        console.log(username);
        await deleteAllTranslations(username);
        setLoading(false);
    }    
    
    return (
        <>
        <Navbar />
        <div className="form-container">
            <h1>Profile</h1>
            <div className="translation">
            { translationsHTML }
            </div>
            {translationsExists && 
            <form onSubmit={handleSubmit(onSubmit)}>
                <button className="delete-btn" type="submit" disabled={ loading }>Delete all translations</button>
            </form>
            }
        </div>
        </>
    );
}

export default Profile;