import { createHeaders } from "./index";
const apiUrl = process.env.REACT_APP_API_URL;
const storage = window.localStorage;

export const checkForUser = async (username) => {
    try {
        const response = await fetch(`${apiUrl}?username=${username}`);

        if(!response.ok) throw new Error("Could not complete request.");
        
        const data = await response.json();
        return [ null, data ];
    }
    catch (error) {
        return [ error.message, [] ];
    }
}

export const createUser = async (username) => {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: createHeaders(),
            body: JSON.stringify({
                username,
                translations: []
            })
        });

        if(!response.ok) throw new Error(`Could not create user with username ${username}`);
        const data = await response.json();
        return [ null, data ];
    }
    catch (error) {
        return [ error.message, [] ];
    }
}

export const loginUser = async (username) => {
    const [ checkError, user ] = await checkForUser(username);
    if(checkError !== null) return [ checkError, null ];
    if(user.length > 0) return [ null, user.pop() ];
    return await createUser(username);
}

export const createTranslation = async (username, translation) => {
    const [checkError, user] = await checkForUser(username)
    if(checkError !== null) return [ checkError, null ];
    if(user.length > 0) {
        let word = translation.replace(/[^A-Za-z']/g, "");
        word.toLowerCase();
        let newTranslations = user[0].translations;
        if(!newTranslations.includes(word)) newTranslations.push(word);
        storage.setItem("translations", newTranslations);

        try {
            const response = await fetch(`${apiUrl}/${user[0].id}`, {
                method: "PATCH",
                headers: createHeaders(),
                body: JSON.stringify({
                    translations: newTranslations
                })
            });
    
            if(!response.ok) throw new Error(`Could not create translation for ${user[0].username}`);
            const data = await response.json();
            return [ null, data ];
        }
        catch (error) {
            return [ error.message, [] ];
        }
    }
    
}

export const deleteAllTranslations = async (username) => {
    const [checkError, user] = await checkForUser(username)

    if(checkError !== null) return [ checkError, null ];
    console.log(user);
    if(user.length > 0) {
        try {
            const response = await fetch(`${apiUrl}/${user[0].id}`, {
                method: "PATCH",
                headers: createHeaders(),
                body: JSON.stringify({
                    translations: []
                })
            });
    
            if(!response.ok) throw new Error(`Could not delete translation for ${user[0].username}`);
            const data = await response.json();
            storage.setItem("translations", []);
            return [ null, data ];
        }
        catch (error) {
            return [ error.message, [] ];
        }
    }
    
}