import { Link, useNavigate } from "react-router-dom";



const Navbar = () => {
    const navigate = useNavigate();
    const storage = window.localStorage;

    const logoutUser = () => {
        storage.clear();
        navigate("/");
    }

    return(
        <>
        <nav>
            <ul>
            <li><Link to="/">Home</Link></li>
            { storage.getItem("username") &&
            <>
                <li><Link to="/translate">Translate</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><button onClick={ logoutUser }>Logout</button></li> 
            </>}
            </ul>
        </nav>
        </>
    );
}

export default Navbar;