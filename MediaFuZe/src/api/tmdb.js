import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: API_KEY,
    },
});

export const getTrendingMovies = async () => {
  const res = await tmdb.get("/trending/movie/week");
  return res.data;
};

export const getTrendingTVShows = async () => {
  const res = await tmdb.get("/trending/tv/week");
  return res.data;
};

export const searchMulti = async (query) => {
  const res = await tmdb.get("/search/multi", {
    params: { query },
  });
  return res.data;
};

export const getDetails = async (type, id) => {
  const res = await tmdb.get(`/${type}/${id}`);
  return res.data;
};

export const getWatchProviders = async (type, id) => {
  const res = await tmdb.get(`/${type}/${id}/watch/providers`);
  return res.data;
};

export const getVideo = async (type, id) => {
  const res = await tmdb.get(`/${type}/${id}/videos`);
  return res.data;
}; 