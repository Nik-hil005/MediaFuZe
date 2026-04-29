export const normalizeTMDB = (item) => {
    return {
        id: item.id,
        title: item.title || item.name,
        image: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : null,
        rating: item.vote_average,
        type: item.title ? "movie" : "tv",
        releaseDate: item.release_date || item.first_air_date,
    };
};

export const normalizeAnilist = (item) => {
    return {
        id: item.id,
        title: item.title.romaji || item.title.english,
        image: item.coverImage.large,
        rating: item.averageScore / 10,
        type: "anime",
        releaseDate: item.starrDate?.year || null,
    };
};

export const normalizeList = (data, type) => {
    if (type === "anime") {
        return data.map(normalizeAnilist);
    }
    return data.map(normalizeTMDB);
};