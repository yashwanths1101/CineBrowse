import { useState, useEffect } from "react";
import { fetchBrowseMovies } from "../utils/api";
import MovieCard from "./MovieCard";
import ShimmerCard from "./ShimmerCard";

const MovieBrowseGrid = () => {
  const [category, setCategory] = useState("mostpopular");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBrowseMovies(category);
        setMovies(data);
      } catch (e) {
        console.log(e);
        setError("Error loading movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  return (
    <div className="flex-col gap-4">
      <div className="h-8 text-slate-200 font-semibold mt-12 flex justify-center items-center gap-10">
        <button
          onClick={() => setCategory("mostpopular")}
          className={`cursor-pointer hover:text-[#33CC99] ${category === "mostpopular" ? "text-[#33CC99]" : ""}`}
        >
          Most popular
        </button>
        <button
          onClick={() => setCategory("mostrating")}
          className={`cursor-pointer hover:text-[#33CC99] ${category === "mostrating" ? "text-[#33CC99]" : ""}`}
        >
          Most rating
        </button>
        <button
          onClick={() => setCategory("mostrecent")}
          className={`cursor-pointer hover:text-[#33CC99] ${category === "mostrecent" ? "text-[#33CC99]" : ""}`}
        >
          Most recent
        </button>
        <button
          onClick={() => setCategory("action")}
          className={`cursor-pointer hover:text-[#33CC99] ${category === "action" ? "text-[#33CC99]" : ""}`}
        >
          Action
        </button>
        <button
          onClick={() => setCategory("adventure")}
          className={`cursor-pointer hover:text-[#33CC99] ${category === "adventure" ? "text-[#33CC99]" : ""}`}
        >
          Adventure
        </button>
        <button
          onClick={() => setCategory("animation")}
          className={`cursor-pointer hover:text-[#33CC99] ${category === "animation" ? "text-[#33CC99]" : ""}`}
        >
          Animation
        </button>
        <button
          onClick={() => setCategory("comedy")}
          className={`cursor-pointer hover:text-[#33CC99] ${category === "comedy" ? "text-[#33CC99]" : ""}`}
        >
          Comedy
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-center mt-6">Error: {error}</div>
      )}

      <div className="flex justify-center px-5 mt-10 flex-wrap gap-4">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <ShimmerCard variant="horizontal" key={i} />
            ))
          : movies.map((movie) => (
              <MovieCard movie={movie} variant="horizontal" key={movie.id} />
            ))}
      </div>
    </div>
  );
};

export default MovieBrowseGrid;
