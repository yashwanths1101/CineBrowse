import { useRef, useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import ShimmerCard from './ShimmerCard'

const MovieRow = ({
  title,
  fetchFn,
  variant = 'vertical',
  isTop10 = false
}) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const rowRef = useRef(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchFn()
        setMovies(data)
      } catch (err) {
        console.error(`Error loading row [${title}]:`, err)
        setError('Failed to load row content.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleScroll = direction => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollAmount = clientWidth * 0.75
      rowRef.current.scrollTo({
        left:
          direction === 'left'
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className='my-8 px-4 md:px-8 max-w-7xl mx-auto relative group/row'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl md:text-2xl font-bold text-white flex items-center tracking-wide'>
          <span className='w-1.5 h-6 bg-[#33CC99] rounded-full mr-3 inline-block shadow-sm shadow-[#33CC99]/50'></span>
          {title}
        </h2>
      </div>

      {error && <div className='text-red-400 text-sm py-4'>{error}</div>}

      <div className='relative'>
        <button
          onClick={() => handleScroll('left')}
          className='absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/80 hover:bg-[#33CC99] text-white hover:text-black rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 shadow-xl backdrop-blur-sm -ml-3 border border-slate-700/60 hover:border-[#33CC99]'
        >
          <svg
            className='w-6 h-6 stroke-current fill-none stroke-[2.5]'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>

        <div
          ref={rowRef}
          className='flex space-x-4 md:space-x-5 overflow-x-auto py-4 px-1 scroll-smooth'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <ShimmerCard key={idx} variant={variant} />
              ))
            : movies.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  variant={variant}
                  rank={isTop10 ? index + 1 : null}
                />
              ))}
        </div>

        <button
          onClick={() => handleScroll('right')}
          className='absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/80 hover:bg-[#33CC99] text-white hover:text-black rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 shadow-xl backdrop-blur-sm -mr-3 border border-slate-700/60 hover:border-[#33CC99]'
        >
          <svg
            className='w-6 h-6 stroke-current fill-none stroke-[2.5]'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default MovieRow
