import { useState } from "react";
import { useForm } from "react-hook-form";
import TranslationList from "./TranslationList";

const inputConfig = {
    required: true,
    minLength: 1,
};

const TranslationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [ loading, setLoading ] = useState(false);
    const [ translate, setTranslate] = useState(null);

    const onSubmit = ({ word }) => {
        setLoading(true);
        setTranslate(<TranslationList input={word} />)
        setLoading(false);
    }    

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="word">word or sentence</label>
                    <input
                        type="text"
                        {...register("word", inputConfig)}
                        placeholder="Enter word or sentence"
                    />
                </fieldset>

                <button type="submit" disabled={ loading }>Translate</button>
                { loading && <p>Translating...</p> }
                </form>
                {translate}
        </>
    );
}

export default TranslationForm;