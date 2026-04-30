import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "../api/tmdb";
import axios from "axios";

function Details() {
  const { type, id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        // 🔴 Anime (AniList)
        if (type === "anime") {
          const query = `
            query ($id: Int) {
              Media(id: $id, type: ANIME) {
                id
                title {
                  romaji
                }
                description
                coverImage {
                  large
                }
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

        } else {
          // 🔵 TMDB (movie / tv)
          const res = await getDetails(type, id);

          setData({
            title: res.title || res.name,
            description: res.overview?.replace(/<[^>]+>/g, ""),
            image: `https://image.tmdb.org/t/p/w500${res.poster_path}`,
            rating: res.vote_average,
            extra: `Release: ${res.release_date || res.first_air_date}`,
          });
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
          className="w-full md:w-[300px] rounded-lg"
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

          <p className="text-sm leading-relaxed">
            {data.description || "No description available."}
          </p>
        </div>

      </div>

    </div>
  );
}

export default Details;