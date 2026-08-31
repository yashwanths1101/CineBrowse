import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchMediaDetails, fetchMediaCredits } from "../utils/api";
import { getBackdropUrl, getPosterUrl } from "../utils/constants";
import ErrorMovieDetails from "./ErrorMovieDetails";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  console.log(`${location}`);

  const type = location.pathname.startsWith("/tv") ? "tv" : "movie";

  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadMediaData = async () => {
      try {
        const [detailsData, creditsData] = await Promise.all([
          fetchMediaDetails(id, type),
          fetchMediaCredits(id, type),
        ]);
        setDetails(detailsData);
        setCast(creditsData?.cast ? creditsData.cast.slice(0, 12) : []);
      } catch (err) {
        console.error("Error fetching media details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadMediaData();
    }
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[70vh] min-h-[480px] bg-slate-900/60 animate-pulse flex items-center justify-center">
        <div className="text-slate-400 font-medium">Loading details...</div>
      </div>
    );
  }

  if (error || !details) {
    return <ErrorMovieDetails />;
  }

  const title = details.title || details.name || "Untitled";
  const releaseDate = details.release_date || details.first_air_date || "";
  const year = releaseDate ? releaseDate.split("-")[0] : "N/A";
  const rating = details.vote_average ? details.vote_average.toFixed(1) : "NR";

  const runtimeMin = details.runtime;
  const hours = Math.floor(runtimeMin / 60);
  const minutes = runtimeMin % 60;
  const formattedRuntime =
    runtimeMin > 0 ? `${hours > 0 ? `${hours}h ` : ""}${minutes}m` : null;

  const genres = details.genres
    ? details.genres.map((g) => g.name).join(" · ")
    : "";

  return (
    <div className="w-full min-h-screen bg-black text-slate-100 pb-16">
      <div className="relative w-full h-[75vh] min-h-[520px] max-h-[700px] overflow-hidden -mt-20">
        <img
          src={getBackdropUrl(details.backdrop_path, "original")}
          alt={title}
          className="w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-12 w-full space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md max-w-3xl">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-slate-300">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                {rating}
              </span>
              <span>•</span>
              <span>{year}</span>
              {formattedRuntime && (
                <>
                  <span>•</span>
                  <span>{formattedRuntime}</span>
                </>
              )}
              {genres && (
                <>
                  <span>•</span>
                  <span className="text-slate-400">{genres}</span>
                </>
              )}
            </div>

            <p className="text-slate-300 text-sm sm:text-base line-clamp-3 max-w-2xl leading-relaxed">
              {details.overview || "No overview available for this title."}
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-3">
              {details.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${details.imdb_id}`}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold p-2.5 rounded-lg transition-all shadow-md shadow-amber-500/20"
                >
                  <span className="font-extrabold">IMDb</span>
                </a>
              )}

              {details.homepage && (
                <a
                  href={details.homepage}
                  className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium p-3 rounded-lg border border-zinc-800 transition-all"
                >
                  <span>Watch Now</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {cast.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-12">
          <h2 className="text-2xl font-bold text-white flex gap-3 items-center mb-6">
            <span className="w-1 h-6 bg-[#33CC99] rounded-full shadow-sm shadow-[#33CC99]/50"></span>
            Actors
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="flex items-center space-x-3.5 bg-zinc-950 border border-slate-800/80 hover:border-[#33CC99]/50 p-3 rounded-xl transition-all duration-300"
              >
                <img
                  src={getPosterUrl(actor.profile_path, "w185")}
                  alt={actor.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-700 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-white truncate">
                    {actor.name}
                  </h3>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {actor.character || "Cast Member"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MovieDetails;
