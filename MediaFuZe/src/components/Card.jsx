import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Card({ item }) {
  const { toggleWatchlist, isWatchlisted } = useAppContext();
  const fav = isWatchlisted(item);

  return (
    <div className="relative w-40">
      <button onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWatchlist(item);}} 
        className="absolute top-2 right-2 z-10 bg-black/70 rounded-full px-2 py-1 text-sm">
        {fav ? "❤️" : "🤍"}
      </button>

    <Link to={`/details/${item.type}/${item.id}`}>
      <div className="bg-linear-to-r/srgb from-fuchsia-900 to-pink-700 rounded-xl overflow-hidden hover:scale-105 transition-transform hover:shadow-lg hover:shadow-black/50 duration-300 cursor-pointer w-full h-80">
        
        {/* Fixed image container */}
        <div className="w-40 h-60 bg-gray-800">
          <img
            src={item.image || "https://via.placeholder.com/300x450"}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div className="p-3 w-40 h-20 line-clamp-2">
          <h2 className="text-sm font-semibold line-clamp-2">
            {item.title}
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            ⭐ {item.rating || "N/A"}
          </p>
        </div>
      </div>
    </Link>
    </div>
  );
}

export default Card;