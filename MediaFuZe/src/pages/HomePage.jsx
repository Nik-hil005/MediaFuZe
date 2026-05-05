import { useEffect, useState } from "react";
import { getTrendingMovies } from "../api/tmdb";
import { getTrendingAnime } from "../api/anilist";
import { getTrendingTVShows } from "../api/tmdb";
import { normalizeList } from "../utils/normalize";
import Card from "../components/Card";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [anime, setAnime] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    // Movies
    getTrendingMovies().then((data) => {
      const normalized = normalizeList(data.results, "movie");
      setMovies(normalized);
    });

    // TV Shows
    getTrendingTVShows().then((data) => {
      const normalized = normalizeList(data.results, "tv");
      setTvShows(normalized);
    });

    // Anime
    getTrendingAnime().then((data) => {
      const filteredAnime = data.filter(
        (item) =>
          !item.genres?.includes("Ecchi") && !item.genres?.includes("Hentai"),
      );
      const normalized = normalizeList(filteredAnime, "anime");
      setAnime(normalized);
    });
  }, []);

  return (
    <div className="p-4 space-y-8 min-h-screen">
      {/* Movies Section */}
      <section>
        <h1 className="text-2xl text-white font-bold mb-4">Trending Movies</h1>

        <div className="flex gap-4 overflow-x-auto 0 no-scrollbar scroll-smooth px-2">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[40] min-h-[60] max-h-[60] max-w[160px] flex shrink-0"
            >
              <Card item={movie} />
            </div>
          ))}
        </div>
      </section>

      {/* TV Shows Section */}
      <section>
        <h1 className="text-2xl text-white font-bold mb-4">
          Trending TV Shows
        </h1>
        <div className="flex gap-4 overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth px-2">
          {tvShows.map((item) => (
            <div key={`${item.id}-${item.type}`} className="shrink-0">
              <Card item={item} />
            </div>
          ))}
        </div>
      </section>

      {/* Anime Section */}
      <section>
        <h1 className="text-2xl text-white font-bold mb-4">Trending Anime</h1>

        <div className="flex gap-4 overflow-x-auto h-90 no-scrollbar scroll-smooth px-2">
          {anime.map((item) => (
            <div
              key={item.id}
              className="min-w-[40] min-h-[60] max-h-[60] max-w[160px] flex shrink-0"
            >
              <Card item={item} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
