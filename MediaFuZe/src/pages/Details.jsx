// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getDetails, getWatchProviders, getVideo } from "../api/tmdb";

// import axios from "axios";

// useEffect(() => {
//   const fetchDetails = async () => {
//     try {
//       setLoading(true);
//       setTrailer(null);

//       // 🔴 Anime
//       if (type === "anime") {
//         const query = `
//           query ($id: Int) {
//             Media(id: $id, type: ANIME) {
//               id
//               title { romaji }
//               description
//               coverImage { large }
//               averageScore
//               episodes
//               trailer {
//                 id
//                 site
//               }
//             }
//           }
//         `;

//         const res = await axios.post("https://graphql.anilist.co", {
//           query,
//           variables: { id: Number(id) },
//         });

//         const media = res.data.data.Media;

//         setData({
//           title: media.title.romaji,
//           description: media.description,
//           image: media.coverImage.large,
//           rating: media.averageScore,
//           extra: `Episodes: ${media.episodes || "N/A"}`,
//         });

//         setProviders([]);

//         // ✅ Anime trailer
//         if (media.trailer?.site === "youtube") {
//           setTrailer(media.trailer.id);
//         }

//       } else {
//         // 🔵 TMDB
//         const res = await getDetails(type, id);

//         setData({
//           title: res.title || res.name,
//           description: res.overview?.replace(/<[^>]+>/g, ""),
//           image: `https://image.tmdb.org/t/p/w500${res.poster_path}`,
//           rating: res.vote_average,
//           extra: `Release: ${res.release_date || res.first_air_date}`,
//         });

//         // ✅ Providers
//         const providerRes = await getWatchProviders(type, id);
//         setProviders(providerRes.results?.IN?.flatrate || []);

//         // ✅ TMDB trailer
//         const videoRes = await getVideo(type, id);

//         const trailerVideo = videoRes.results.find(
//           (vid) =>
//             vid.type === "Trailer" && vid.site === "YouTube"
//         );

//         if (trailerVideo) {
//           setTrailer(trailerVideo.key);
//         }
//       }

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchDetails();
// }, [type, id]);

//   if (loading) return <p className="p-4">Loading...</p>;
//   if (!data) return <p className="p-4">No data found</p>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto min-h-screen">
//       <div className="flex flex-col md:flex-row gap-6">
//         <img
//           src={data.image}
//           alt={data.title}
//           className="max-h-80 md:w-[300px] rounded-lg"
//         />

//         <div>
//           <h1 className="text-3xl font-bold mb-2">{data.title}</h1>

//           <p className="text-gray-400 mb-2">⭐ {data.rating || "N/A"}</p>

//           <p className="text-gray-400 mb-4">{data.extra}</p>

//           <p className="text-sm leading-relaxed line-clamp-5">
//             {data.description || "No description available."}
//           </p>

//           {providers.length > 0 && (
//             <div className="mt-4">
//               <h2 className="text-lg font-semibold mb-2">Where to Watch</h2>

//               <div className="flex gap-3 flex-wrap">
//                 {providers.map((p) => (
//                   <div key={p.provider_id} className="text-center">
//                     <img
//                       src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
//                       alt={p.provider_name}
//                       className="w-12 h-10 rounded"
//                     />
//                     <p className="text-xs mt-1 w-12 line-clamp-2">
//                       {p.provider_name}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//               )}
//               {trailer ? (
//                 <div className="mt-8">
//                   <h2 className="text-xl font-semibold mb-4">Trailer</h2>

//                   <div className="w-full aspect-video rounded-lg overflow-hidden">
//                     <iframe
//                       className="w-full h-full"
//                       src={`https://www.youtube.com/embed/${trailer}`}
//                       title="Trailer"
//                       allowFullScreen
//                     ></iframe>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-gray-400 mt-6">
//                   No trailer available.
//                   </p>
//               )}
          
//         </div>
//       </div>
//     </div>
//   );


// export default Details;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails, getWatchProviders, getVideo } from "../api/tmdb";
import axios from "axios";

function Details() {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState([]);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setTrailer(null);

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
                trailer {
                  id
                  site
                }
              }
            }
          `;

          const res = await axios.post("https://graphql.anilist.co", {
            query,
            variables: { id: Number(id) },
          });

          const media = res.data.data.Media;

          setData({
            title: media.title.romaji,
            description: media.description?.replace(/<[^>]+>/g, ""),
            image: media.coverImage.large,
            rating: media.averageScore,
            extra: `Episodes: ${media.episodes || "N/A"}`,
          });

          setProviders([]);

          if (media.trailer?.site === "youtube") {
            setTrailer(media.trailer.id);
          }
        } else {
          const res = await getDetails(type, id);

          setData({
            title: res.title || res.name,
            description: res.overview?.replace(/<[^>]+>/g, ""),
            image: `https://image.tmdb.org/t/p/w500${res.poster_path}`,
            rating: res.vote_average,
            extra: `Release: ${res.release_date || res.first_air_date}`,
          });

          const providerRes = await getWatchProviders(type, id);
          setProviders(providerRes.results?.IN?.flatrate || []);

          const videoRes = await getVideo(type, id);
          const trailerVideo = videoRes.results.find(
            (vid) => vid.type === "Trailer" && vid.site === "YouTube"
          );

          if (trailerVideo) {
            setTrailer(trailerVideo.key);
          }
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
          className="max-h-80 md:w-75 rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
          <p className="text-gray-400 mb-2">⭐ {data.rating || "N/A"}</p>
          <p className="text-gray-400 mb-4">{data.extra}</p>
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
                    <p className="text-xs mt-1 w-12 line-clamp-2">
                      {p.provider_name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {trailer ? (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Trailer</h2>
              <div className="w-full aspect-video rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${trailer}`}
                  title="Trailer"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ) : (
            <p className="text-white mt-6">No trailer available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;