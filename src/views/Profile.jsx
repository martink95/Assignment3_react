import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
const Profile = () => {
    useEffect(() => {
        document.title = "Profile";
    }, []);
    
    return (
        <>
        <Navbar />
        <h1>Profile</h1>
        </>
    );
}

export default Profile;