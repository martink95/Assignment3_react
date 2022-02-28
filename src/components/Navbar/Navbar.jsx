import { Link } from "react-router-dom";
import { logoutUser } from "../../api/user";
const Navbar = () => {
    return(
        <>
        <nav>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/translate">Translate</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <button onClick={ logoutUser }>Logout</button>
        </nav>
        </>
    );
}

export default Navbar;