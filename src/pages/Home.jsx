import { useEffect, useState } from "react";
import {
  fetchTrendingMovies,
  fetchTop10Today,
  fetchTopRatedMovies,
  fetchMoviesByGenre,
} from "../utils/api";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";

const Home = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const loadFeaturedMovie = async () => {
      try {
        const movies = await fetchTrendingMovies("day");
        if (movies && movies.length > 0) {
          setFeaturedMovie(movies[0]);
        }
      } catch (err) {
        console.error("Error loading hero movie:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedMovie();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[70vh] min-h-[480px] bg-black animate-pulse flex items-center justify-center mt-16">
        <div className="text-slate-500 font-medium">
          Loading featured movie...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-slate-100 pb-16">
      <HeroBanner movie={featuredMovie} />

      <MovieRow
        title="TOP 10 Today"
        fetchFn={fetchTop10Today}
        variant="vertical"
        isTop10={true}
      />

      <MovieRow
        title="Trending Today"
        fetchFn={() => fetchTrendingMovies("week")}
        variant="horizontal"
      />

      <MovieRow
        title="Top Rated Movies"
        fetchFn={fetchTopRatedMovies}
        variant="vertical"
      />

      <MovieRow
        title="Comedy Hits"
        fetchFn={() => fetchMoviesByGenre(35)}
        variant="vertical"
      />

      <MovieRow
        title="Action Blockbusters"
        fetchFn={() => fetchMoviesByGenre(28)}
        variant="horizontal"
      />
    </div>
  );
};

export default Home;
