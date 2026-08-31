import { TMDB_API_KEY, TMDB_BASE_URL } from "./constants";

export const fetchTrendingMovies = async (timeWindow = "day") => {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/movie/${timeWindow}?api_key=${TMDB_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await response.json();
  console.log(data);
  return data.results;
};

export const fetchTop10Today = async () => {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/all/day?api_key=${TMDB_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top 10 movies");
  }

  const data = await response.json();
  return data.results.slice(0, 10);
};

export const fetchTopRatedMovies = async () => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top rated movies");
  }

  const data = await response.json();
  return data.results;
};

export const fetchMoviesByGenre = async (genreId) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies by genre");
  }

  const data = await response.json();
  return data.results;
};

export const fetchMediaDetails = async (id, type = "movie") => {
  const response = await fetch(
    `${TMDB_BASE_URL}/${type}/${id}?api_key=${TMDB_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} details`);
  }

  return await response.json();
};

export const fetchMediaCredits = async (id, type = "movie") => {
  const response = await fetch(
    `${TMDB_BASE_URL}/${type}/${id}/credits?api_key=${TMDB_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} credits`);
  }

  return await response.json();
};

export const fetchBrowseMovies = async (category) => {
  switch (category) {
    case "mostpopular":
      return fetchTrendingMovies();
    case "mostrating":
      return fetchTopRatedMovies();
    case "mostrecent":
      return fetchTrendingMovies("day");
    case "action":
      return fetchMoviesByGenre("28");
    case "adventure":
      return fetchMoviesByGenre("12");
    case "animation":
      return fetchMoviesByGenre("16");
    case "comedy":
      return fetchMoviesByGenre("35");
    default:
      return fetchTrendingMovies();
  }
};
