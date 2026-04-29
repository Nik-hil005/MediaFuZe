import { Link } from "react-router-dom";

function Card({ item }) {
  return (
    <Link to={`/details/${item.type}/${item.id}`}>
      <div className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition-transform hover:shadow-lg hover:shadow-black/50 duration-300 cursor-pointer w-full h-[320px]">
        
        {/* Fixed image container */}
        <div className="w-[160px] h-[240px] bg-gray-800">
          <img
            src={item.image || "https://via.placeholder.com/300x450"}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div className="p-3 w-[160px] h-[80px] line-clamp-2">
          <h2 className="text-sm font-semibold line-clamp-2">
            {item.title}
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            ⭐ {item.rating || "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Card;