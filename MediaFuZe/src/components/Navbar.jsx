import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="flex justify-between items-center px-6 py-4 
bg-[#0a0014]/80 backdrop-blur-md 
border-b border-purple-500/20 
sticky top-0 z-50"
    >
      {/* Logo */}
      <h1
        className="text-2xl font-bold text-purple-400 tracking-wide 
  drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]"
      >
        MediaFuZe
      </h1>

      {/* Links */}
      <div className="flex gap-8 text-sm font-medium">
        <Link
          to="/"
          className="text-gray-300 hover:text-purple-400 transition duration-200
      hover:drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]"
        >
          Home
        </Link>

        <Link
          to="/search"
          className="text-gray-300 hover:text-purple-400 transition duration-200
      hover:drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]"
        >
          Search
        </Link>

        <Link
          to="/watchlist"
          className="text-gray-300 hover:text-purple-400 transition duration-200
      hover:drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]"
        >
          Watchlist
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
