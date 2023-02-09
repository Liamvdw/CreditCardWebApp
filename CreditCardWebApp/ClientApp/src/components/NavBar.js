import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Credit Card Application</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/display-cards">Display Cards</Link>
            </div>
        </nav>
    );
}

export default Navbar;