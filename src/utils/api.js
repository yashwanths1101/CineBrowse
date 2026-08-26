import { TMDB_API_KEY, TMDB_BASE_URL } from "./constants";

export const fetchTrendingMovies = async (timeWindow = "day") => {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/movie/${timeWindow}?api_key=${TMDB_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await response.json();
  return data.results;
};
