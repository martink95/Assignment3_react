import { useState } from "react";
import { useForm } from "react-hook-form";
import { createTranslation } from "../../api/user";
import TranslationItem from "./TranslationItem";

const inputConfig = {
    required: true,
};

const TranslationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [ loading, setLoading ] = useState(false);
    const [ translate, setTranslate] = useState(null);
    const storage = window.localStorage;

    const onSubmit = async ({ word }) => {
        setLoading(true);
        setTranslate(<TranslationItem input={word} />)
        await createTranslation(storage.getItem("username"), word)
        setLoading(false);
    }

    const errorMessage = (() => {
        if(!errors.word) return null;
        if(errors.word.type === "required") return <span className="error-message">Please type something</span>;
    })();

    return(
        <>
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="word">word or sentence</label>
                    <input
                        type="text"
                        {...register("word", inputConfig)}
                        placeholder="Enter word or sentence"
                    />
                    <button type="submit" disabled={ loading }>Translate</button>
                    { errorMessage }
                </fieldset>
                </form>
                
                { loading && <p>Translating...</p> }
                    <div className="translation">
                    {translate}
                    </div>
                </div>
        </>
    );
}

export default TranslationForm;