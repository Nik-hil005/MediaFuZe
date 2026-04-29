import axios from 'axios';

const anilist = axios.create({
    baseURL: "https://graphql.anilist.co",
});

export const searchAnime = async (search) => {
    const query = `
    query ($search: String) {
    Page(page: 1, perPage:20) {
      media(search: $search, type: ANIME) {
        id
        title {
        romaji
        english
        }
        coverImage {
        large
        }
        averageScore
      }
    }
  }
  `;
    const res = await anilist.post("", {
        query,
        variables: { search },
    });

    return res.data.data.Page.media;
};

export const getTrendingAnime = async () => {
    const query = `
    query {
    Page(page: 1, perPage:20) {
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        averageScore
      }
    }
  }
  `;
    const res = await anilist.post("", {
        query,
    });

    return res.data.data.Page.media;
};