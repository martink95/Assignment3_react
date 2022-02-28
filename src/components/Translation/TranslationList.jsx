
const TranslationList = (props) => {
    if(props.input !== undefined) {
        let word = props.input.replace(/[^A-Za-z']/g, "");
        let charArray = word.toLowerCase().split("");
        const listItems = charArray.map((image, index) => <img src={require(`../../images/${image}.png`)} key={index} alt={image}/>)
        console.log(listItems);
        return (
            <>
                <ul>
                     { listItems }
                </ul>
            </>
        );
    }
    return <></>
}

export default TranslationList;
