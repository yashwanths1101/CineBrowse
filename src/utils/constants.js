export const TMDB_API_KEY = "dda5b21d228e040ab41e433872d46fc8";
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
