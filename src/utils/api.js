import { TMDB_API_KEY, TMDB_BASE_URL } from "./constants";

export const fetchTrendingMovies = async (timeWindow = "day", page = 1) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/movie/${timeWindow}?api_key=${TMDB_API_KEY}&page=${page}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await response.json();
  return data.results;
};

export const fetchNowPlayingMovies = async (page = 1) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGE1YjIxZDIyOGUwNDBhYjQxZTQzMzg3MmQ0NmZjOCIsIm5iZiI6MTc4NzczODQwNi43MzcsInN1YiI6IjZhOGViOTI2YTI2NjNjZmIwM2MzNmYyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JGuyduUrzukr71TJqFcwfkpzSNUivSFQZM3W8fvlI10",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options,
  );

  if (!response.ok) throw new Error("Failed to fetch now playing movies");

  const data = await response.json();
  return data.results;
};

export const fetchTop10Today = async (page = 1) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/all/day?api_key=${TMDB_API_KEY}&page=${page}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top 10 movies");
  }

  const data = await response.json();
  return data.results.slice(0, 10);
};

export const fetchTopRatedMovies = async (page = 1) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&page=${page}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top rated movies");
  }

  const data = await response.json();
  return data.results;
};

export const fetchMoviesByGenre = async (genreId, page = 1) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`,
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

export const fetchBrowseMovies = async (category, page) => {
  switch (category) {
    case "mostpopular":
      return fetchTrendingMovies("day", page);
    case "mostrating":
      return fetchTopRatedMovies(page);
    case "nowplaying":
      return fetchNowPlayingMovies(page);
    case "action":
      return fetchMoviesByGenre("28", page);
    case "adventure":
      return fetchMoviesByGenre("12", page);
    case "animation":
      return fetchMoviesByGenre("16", page);
    case "comedy":
      return fetchMoviesByGenre("35", page);
    default:
      return fetchTrendingMovies();
  }
};
