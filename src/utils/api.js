import { TMDB_BASE_URL, TMDB_HEADERS } from "./constants";

export const fetchTrendingMovies = async (timeWindow = "day", page = 1) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/movie/${timeWindow}?page=${page}`,
    { headers: TMDB_HEADERS },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await response.json();
  return data.results;
};

export const fetchNowPlayingMovies = async (page = 1) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=${page}`,
    { headers: TMDB_HEADERS },
  );

  if (!response.ok) throw new Error("Failed to fetch now playing movies");

  const data = await response.json();
  return data.results;
};

export const fetchTop10Today = async (page = 1) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/all/day?page=${page}`,
    { headers: TMDB_HEADERS },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top 10 movies");
  }

  const data = await response.json();
  return data.results.slice(0, 10);
};

export const fetchTopRatedMovies = async (page = 1) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/top_rated?page=${page}`,
    { headers: TMDB_HEADERS },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top rated movies");
  }

  const data = await response.json();
  return data.results;
};

export const fetchMoviesByGenre = async (genreId, page = 1) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}`,
    { headers: TMDB_HEADERS },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies by genre");
  }

  const data = await response.json();
  return data.results;
};

export const fetchMediaDetails = async (id, type = "movie") => {
  const response = await fetch(`${TMDB_BASE_URL}/${type}/${id}`, {
    headers: TMDB_HEADERS,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} details`);
  }

  return await response.json();
};

export const fetchMediaCredits = async (id, type = "movie") => {
  const response = await fetch(`${TMDB_BASE_URL}/${type}/${id}/credits`, {
    headers: TMDB_HEADERS,
  });

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

export const fetchMovieByName = async (name, mediaType = "all", page = 1) => {
  if (!name || !name.trim()) return [];

  let endpoint = `${TMDB_BASE_URL}/search/multi?query=${encodeURIComponent(
    name,
  )}&page=${page}&include_adult=false`;

  if (mediaType === "movie") {
    endpoint = `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(
      name,
    )}&page=${page}&include_adult=false`;
  } else if (mediaType === "tv") {
    endpoint = `${TMDB_BASE_URL}/search/tv?query=${encodeURIComponent(
      name,
    )}&page=${page}&include_adult=false`;
  }

  const response = await fetch(endpoint, { headers: TMDB_HEADERS });

  if (!response.ok) {
    throw new Error("Failed to fetch movie by name");
  }

  const data = await response.json();

  return (data.results || []).filter((item) => {
    if (mediaType === "all") return true;
    return mediaType === item.media_type;
  });
};
