export const normalizeTMDB = (item) => {
    return {
        id: item.id,
        title: item.title || item.name,
        image: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : null,
        rating: item.vote_average?.toFixed(1) || null,
        type: item.title ? "movie" : "tv",
        releaseDate: item.release_date || item.first_air_date,
    };
};

export const normalizeAnilist = (item) => {
    return {
        id: item.id,
        title: item.title.romaji || item.title.english,
        image: item.coverImage.large,
        rating: item.averageScore ? (item.averageScore / 10).toFixed(1) : null,
        type: "anime",
        releaseDate: item.starrDate?.year || null,
    };
};

export const normalizeList = (data, type) => {
  return data.map((item) => ({
    id: item.id,
    title:
        type === "anime"
        ? item.title.romaji || item.title.english
        : item.title || item.name,
    image:
        type === "anime"
        ? item.coverImage.large
        : `https://image.tmdb.org/t/p/w500${item.poster_path}` || null,
    rating: 
        type === "anime"
        ? item.averageScore ? (item.averageScore / 10).toFixed(1) : null
        : item.vote_average?.toFixed(1) || null,
    type,
    releaseDate: item.release_date || item.first_air_date || item.starrDate?.year || null,
  }));
};