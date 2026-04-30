import { useEffect, useState } from "react";
import { searchMulti } from "../api/tmdb";
import { searchAnime } from "../api/anilist";
import { normalizeList } from "../utils/normalize";
import useDebounce from "../hooks/useDebounce";
import Card from "../components/Card";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query, 1000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        setError(null);
        // TMDB movies + tv
        const tmdbRes = await searchMulti(debouncedQuery);

        const filtered = tmdbRes.results.filter(
          (item) => item.media_type === "movie" || item.media_type === "tv",
        );
        const tmdbData = normalizeList(filtered, "movie");

        // Anilist anime
        const animeRes = await searchAnime(debouncedQuery);
        const animeData = normalizeList(animeRes, "anime");

        const merged = [...tmdbData, ...animeData];

        setResults(merged);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  return (
    <div className="p-4 min-h-screen">
      <input
        type="text"
        placeholder="Search movies, TV shows, anime..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-900 text-white outline-none mb-6"
      />
      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : results.length === 0 ? (
        <div className="text-center mt-10 text-gray-400">
          {query ? (
            <>
              <p className="text-lg text-center mt-10 text-gray-400 animate-fade-in">🔍 No results found</p>
              <p className="text-sm mt-2 text-center mt-10 text-gray-400 animate-fade-in">
                Try a different keyword or spelling.
              </p>
            </>
          ) : (
            <>
              <p className="text-lg text-center mt-10 text-gray-400 animate-fade-in">Start searching 🎬</p>
              <p className="text-sm mt-2 text-center mt-10 text-gray-400 animate-fade-in">
                Movies, TV shows, anime—all in one place.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {results.map((item) => (
            <Card key={`${item.id}-${item.type}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
