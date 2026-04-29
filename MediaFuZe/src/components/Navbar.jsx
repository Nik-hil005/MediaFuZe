import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex gap-6 p-4 bg-gray-900">
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/watchlist">Watchlist</Link> 
        </nav>
    );
}

export default Navbar;