import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async (apiKey: string) => {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
            api_key: apiKey,
            language: "ko-KR",
            page: 1,
        },
    });
    return response.data.results;
};

export const fetchMovieDetails = async (movieId: number, apiKey: string) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
            api_key: apiKey,
            language: "ko-KR",
        },
    });
    return response.data;
};
