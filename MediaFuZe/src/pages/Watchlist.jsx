import { useAppContext } from "../context/AppContext";
import Card from "../components/Card";

function Watchlist() {
    const { watchlist } = useAppContext();

return (
    <div className="p-4 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>
        
        {watchlist.length === 0 ? (
            <p>Your watchlist is empty.</p>
        ) : (
            <div className="flex flex-wrap gap-4">
                {watchlist.map((item) => (
                    <Card key={`${item.id}-${item.type}`} item={item} />
                ))}
            </div>
        )}
    </div>
);
}

export default Watchlist;