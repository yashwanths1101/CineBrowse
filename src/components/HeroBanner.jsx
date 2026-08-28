import { Star, Play, Info } from "lucide-react";
import { Link } from "react-router-dom";

const HeroBanner = ({ movie }) => {
  if (!movie) return null;

  const { id, title, overview, backdrop_path, vote_average, release_date } =
    movie;

  console.log(release_date + " " + vote_average);

  const releaseYear = release_date ? release_date.split("-")[0] : "";
  const rating = vote_average ? vote_average.toFixed(1) : "NR";
  const backdropUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : "";

  return (
    <div className="relative w-full h-[75vh] min-h-[520px] max-h-[700px] overflow-hidden -mt-20">
      <img
        src={backdropUrl}
        alt={title}
        className="w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent" />

      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto px-6 pb-14 w-full space-y-4">
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{rating}</span>
            </span>
            <span className="bg-zinc-900/80 px-2.5 py-1 rounded-md border border-zinc-800 text-slate-300">
              {releaseYear}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md max-w-2xl">
            {title}
          </h1>

          <p className="text-slate-300 text-sm line-clamp-3 max-w-xl leading-relaxed sm:text-base">
            {overview}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <Link
              to={`/movie/${id}`}
              className="flex items-center gap-2 bg-[#33CC99] text-black hover:bg-[#2bb888] cursor-pointer font-bold px-6 py-2.5 rounded-lg transition-all shadow-lg shadow-[#33CC99]/20"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Watch Details</span>
            </Link>

            <Link
              to={`/movie/${id}`}
              className="flex items-center gap-2 bg-zinc-900/90 hover:bg-zinc-800 cursor-pointer text-white font-medium px-5 py-2.5 rounded-lg border border-zinc-800 transition-all"
            >
              <Info className="w-4 h-4 text-slate-300" />
              <span>More Info</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
