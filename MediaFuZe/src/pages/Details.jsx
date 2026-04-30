import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails, getWatchProviders } from "../api/tmdb";
import axios from "axios";

function Details() {
  const { type, id } = useParams();
  const [ providers, setProviders ] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchDetails = async () => {
    try {
      setLoading(true);

      // 🔴 Anime
      if (type === "anime") {
        const query = `
          query ($id: Int) {
            Media(id: $id, type: ANIME) {
              id
              title { romaji }
              description
              coverImage { large }
              averageScore
              episodes
            }
          }
        `;

        const res = await axios.post("https://graphql.anilist.co", {
          query,
          variables: { id: Number(id) },
        });

        setData({
          title: res.data.data.Media.title.romaji,
          description: res.data.data.Media.description,
          image: res.data.data.Media.coverImage.large,
          rating: res.data.data.Media.averageScore,
          extra: `Episodes: ${res.data.data.Media.episodes || "N/A"}`,
        });

        setProviders([]); // anime = no providers
      } else {
        // 🔵 TMDB
        const res = await getDetails(type, id);

        setData({
          title: res.title || res.name,
          description: res.overview?.replace(/<[^>]+>/g, ""),
          image: `https://image.tmdb.org/t/p/w500${res.poster_path}`,
          rating: res.vote_average,
          extra: `Release: ${res.release_date || res.first_air_date}`,
        });

        // ✅ Fetch providers HERE
        const providerRes = await getWatchProviders(type, id);
        const indiaProviders =
          providerRes.results?.IN?.flatrate || [];

        setProviders(indiaProviders);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchDetails();
  }, [type, id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!data) return <p className="p-4">No data found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">

      <div className="flex flex-col md:flex-row gap-6">

        <img
          src={data.image}
          alt={data.title}
          className="max-h-80 md:w-[300px] rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">
            {data.title}
          </h1>

          <p className="text-gray-400 mb-2">
            ⭐ {data.rating || "N/A"}
          </p>

          <p className="text-gray-400 mb-4">
            {data.extra}
          </p>

          <p className="text-sm leading-relaxed line-clamp-5">
            {data.description || "No description available."}
          </p>

          {providers.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Where to Watch</h2>

                <div className="flex gap-3 flex-wrap">
                  {providers.map((p) => (
                    <div key={p.provider_id} className="text-center">
                      <img
                        src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                        alt={p.provider_name}
                        className="w-12 h-10 rounded"
                      />
                      <p className="text-xs mt-1 w-12 line-clamp-2">{p.provider_name}</p>
                    </div>
                  ))}
                </div>
              </div>
                      )}
        </div>

      </div>

    </div>
  );
}

export default Details;