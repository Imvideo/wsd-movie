import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

// 인기 영화 가져오기 (페이지 번호를 선택적으로 받음)
export const fetchPopularMovies = async (
    apiKey: string,
    page = 1 // 기본값으로 페이지 1 설정
) => {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
            api_key: apiKey,
            language: "ko-KR",
            page: page, // 페이지 번호 전달
        },
    });
    return response.data.results;
};

// 영화 상세 정보 가져오기
export const fetchMovieDetails = async (movieId: number, apiKey: string) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
            api_key: apiKey,
            language: "ko-KR",
        },
    });
    return response.data;
};

// 특정 영화 유형 가져오기 (예: popular, now_playing 등)
export const fetchMoviesByType = async (type: string, apiKey: string) => {
    const response = await axios.get(`${BASE_URL}/movie/${type}`, {
        params: {
            api_key: apiKey,
            language: "ko-KR",
            page: 1,
        },
    });
    return response.data.results;
};

// 특정 장르 영화 가져오기
export const fetchMoviesByGenre = async (genreId: number, apiKey: string) => {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
            api_key: apiKey,
            language: "ko-KR",
            page: 1,
            with_genres: genreId,
        },
    });
    return response.data.results;
};
