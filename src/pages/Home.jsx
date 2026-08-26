import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../utils/api";
import HeroBanner from "../components/HeroBanner";

const Home = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedMovie = async () => {
      try {
        setLoading(true);
        const movies = await fetchTrendingMovies("day");
        if (movies && movies.length > 0) {
          // select the first trending movie for the Hero Banner
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
    <div className="w-full min-h-screen bg-black">
      {/* Cinematic Hero Banner */}
      <HeroBanner movie={featuredMovie} />
    </div>
  );
};

export default Home;
