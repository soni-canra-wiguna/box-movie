import axios from "axios"

export const baseUrl = import.meta.env.VITE_BASE_URL
export const API_KEY = import.meta.env.API_KEY
const token = `Bearer ${import.meta.env.VITE_TOKEN_APP}`
const url = import.meta.env.VITE_BASE_URL
const apiKey = import.meta.env.VITE_API_KEY

export const lang = "?language=en-US"
export const params = {
  headers: {
    accept: "application/json",
    Authorization: token,
  },
}

export const instanceAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    // Authorization: token,
  },
})

export const type = {
  movie: "movie",
  tv: "tv",
}

export const requests = {
  // movie
  movieNowPlaying: `${url}/movie/now_playing?api_key=${apiKey}&language=en-US`,
  movieTrending: `${url}/trending/movie/day?api_key=${apiKey}&language=en-US`,
  movieTopRated: `${url}/movie/top_rated?api_key=${apiKey}&language=en-US`,
  moviePopular: `${url}/movie/popular?api_key=${apiKey}&language=en-US`,
  movieUpComing: `${url}/movie/upcoming?api_key=${apiKey}&language=en-US`,

  // trending movie day
  movieTrendingDay: `${url}/trending/movie/day?api_key=${apiKey}&language=en-US`,

  // tv
  tvTrending: `${url}/trending/tv/day?api_key=${apiKey}&language=en-US`,
  tvTopRated: `${url}/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`,
  tvPopular: `${url}/tv/popular?api_key=${apiKey}&language=en-US`,
  tvAiringToday: `${url}/tv/airing_today?api_key=${apiKey}&language=en-US`,
  tvOnTheAir: `${url}/tv/on_the_air?api_key=${apiKey}&language=en-US`,

  //genre
  genresMovie:
    "https://api.themoviedb.org/3/genre/movie/list?api_key=08d7d48a7c08409efd8da23c5555343d&language=en",
  genresTv:
    "https://api.themoviedb.org/3/genre/tv/list?api_key=08d7d48a7c08409efd8da23c5555343d&language=en",

  // video
  watchVideo: "YouTube: https://www.youtube.com/watch?v=${id}",
}

// keywoaard

// https://api.themoviedb.org/3/movie/{movie_id}/keywords
