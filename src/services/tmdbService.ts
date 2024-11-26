import axios from "axios";

const API_KEY = "YOUR_API_KEY"; // TMDB API 키
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
            api_key: API_KEY,
            language: "ko-KR",
            page: 1,
        },
    });
    return response.data.results;
};

export const fetchMovieDetails = async (movieId: number) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
            api_key: API_KEY,
            language: "ko-KR",
        },
    });
    return response.data;
};
