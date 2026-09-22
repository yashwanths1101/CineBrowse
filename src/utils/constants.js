export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || "";
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const getPosterUrl = (path, size = "w500") => {
  if (!path)
    return "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path, size = "w780") => {
  if (!path)
    return "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

export const getGenreNames = (genreIds = []) => {
  if (!genreIds || genreIds.length === 0) return "";
  return genreIds
    .slice(0, 2)
    .map((id) => GENRE_MAP[id])
    .filter(Boolean)
    .join(", ");
};
