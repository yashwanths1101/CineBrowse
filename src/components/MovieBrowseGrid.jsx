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
  const maxPages = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      console.log(loading)
      console.log(entries)

      if (
        !loading &&
        entries[0].isIntersecting &&
        (maxPages.current === null || page < maxPages.current)
      ) {
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

        console.log(data)
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
    <div className='flex-col gap-4 pb-10'>
      <div className='h-8 text-slate-200 font-semibold mt-12 flex justify-center items-center gap-10'>
        {categoryList.map(cat => (
          <button
            key={cat[0]}
            onClick={() => {
              setCategory(cat[0])
              setPage(1)
              maxPages.current = null
              setMovies([])
            }}
            className={`cursor-pointer hover:text-[#33CC99] ${
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

      <div className='flex justify-center px-5 mt-10 flex-wrap gap-4'>
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
