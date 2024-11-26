import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

// 인기 영화 가져오기 (페이지 번호를 선택적으로 받음)
export const fetchPopularMovies = async (
    apiKey: string,
    page = 1, // 기본값으로 페이지 1 설정
    genreId = "", // 선택적인 장르 필터링
    rating = "", // 선택적인 평점 필터링
    sort = "popularity.desc" // 선택적인 정렬 옵션
) => {
    const params: any = {
        api_key: apiKey,
        language: "ko-KR",
        page: page, // 페이지 번호 전달
        sort_by: sort, // 정렬 기준
    };

    // 장르 필터링
    if (genreId) {
        params.with_genres = genreId;
    }

    // 평점 필터링
    if (rating) {
        params.vote_average.gte = rating; // 평점 필터링
    }

    try {
        const response = await axios.get(`${BASE_URL}/discover/movie`, { params });
        return response.data.results;
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        throw error;
    }
};

// 영화 상세 정보 가져오기
export const fetchMovieDetails = async (movieId: number, apiKey: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
            params: {
                api_key: apiKey,
                language: "ko-KR",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};

// 특정 영화 유형 가져오기 (예: popular, now_playing 등)
export const fetchMoviesByType = async (type: string, apiKey: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${type}`, {
            params: {
                api_key: apiKey,
                language: "ko-KR",
                page: 1,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error(`Error fetching movies by type (${type}):`, error);
        throw error;
    }
};

// 특정 장르 영화 가져오기
export const fetchMoviesByGenre = async (genreId: number, apiKey: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/discover/movie`, {
            params: {
                api_key: apiKey,
                language: "ko-KR",
                page: 1,
                with_genres: genreId,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error(`Error fetching movies by genre (${genreId}):`, error);
        throw error;
    }
};

// src/services/tmdbService.ts
export const fetchGenres = async (apiKey: string) => {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: {
            api_key: apiKey,
            language: "ko-KR",
        },
    });
    return response.data;
};

export const fetchFilteredMovies = async ({
                                              apiKey,
                                              page = 1,
                                              genre = "",
                                              rating = "",
                                              sort = "popularity.desc",
                                          }: {
    apiKey: string;
    page: number;
    genre?: string;
    rating?: string;
    sort?: string;
}) => {
    const params: any = {
        api_key: apiKey,
        language: "ko-KR",
        page,
        sort_by: sort,
    };

    if (genre) params.with_genres = genre;
    if (rating) params["vote_average.gte"] = rating;

    const response = await axios.get(`${BASE_URL}/discover/movie`, { params });
    return response.data;
};


