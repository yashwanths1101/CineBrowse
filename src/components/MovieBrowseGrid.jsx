import { useState, useEffect, useRef } from 'react'
import { fetchBrowseMovies } from '../utils/api'
import MovieCard from './MovieCard'
import ShimmerCard from './ShimmerCard'

const MovieBrowseGrid = () => {
  const [category, setCategory] = useState('mostpopular')
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const sentinal = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (!loading && entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1)
      }
    })

    observer.observe(sentinal.current)
    return () => observer.disconnect()
  }, [loading])

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchBrowseMovies(category, page)
        setMovies(prev => [...prev, ...data])
      } catch (e) {
        console.log(e)
        setError('Error loading movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [category, page])

  const categoryList = [
    ['mostpopular', 'Most Popular'],
    ['mostrating', 'Most Rating'],
    ['nowplaying', 'Now Playing'],
    ['action', 'Action'],
    ['adventure', 'Adventure'],
    ['animation', 'Animation'],
    ['comedy', 'Comedy']
  ]

  return (
    <div className='w-full pb-10'>
      <div
        className='text-slate-200 font-semibold mt-6 sm:mt-12 flex items-center justify-start md:justify-center gap-5 sm:gap-8 md:gap-10 overflow-x-auto px-4 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categoryList.map(cat => (
          <button
            key={cat[0]}
            onClick={() => {
              setCategory(cat[0])
              setPage(1)
              setMovies([])
            }}
            className={`cursor-pointer hover:text-[#33CC99] transition-colors flex-shrink-0 ${
              category === cat[0] ? 'text-[#33CC99]' : ''
            }`}
          >
            {cat[1]}
          </button>
        ))}
      </div>

      {error && (
        <div className='text-red-500 text-center mt-6'>Error: {error}</div>
      )}

      <div className='flex justify-center px-3 sm:px-5 mt-6 sm:mt-10 flex-wrap gap-3 sm:gap-4'>
        {movies.map((movie, i) => (
          <MovieCard movie={movie} variant='horizontal' key={i} />
        ))}

        {loading &&
          Array.from({ length: 12 }).map((_, i) => (
            <ShimmerCard variant='horizontal' key={i} />
          ))}
      </div>
      <div ref={sentinal} className='h-4'></div>
    </div>
  )
}

export default MovieBrowseGrid
