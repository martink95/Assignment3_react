
const TranslationItem = (props) => {
    if(props.input !== undefined) {
        let word = props.input.replace(/[^A-Za-z']/g, "");
        let charArray = word.toLowerCase().split("");
        const listImages = charArray.map((image, index) => {
            return(
                <div className="translation-item" key={index}>
                    <p>{image}</p>
                    <img src={require(`../../images/${image}.png`)}  alt={image}/>
                </div>  
            );
        })

        return (
            <>
                <ul>
                     { listImages }
                </ul>
            </>
        );
    }
    return <></>
}

export default TranslationItem;
