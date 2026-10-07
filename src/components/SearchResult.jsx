import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMovieByName } from '../utils/api.js'
import { getPosterUrl, getGenreNames } from '../utils/constants.js'
import { ChevronDown, ChevronUp, Info, Loader2 } from 'lucide-react'

const SearchResult = ({ query, mediaType, setIsSearch }) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (!query) return

    const timer = setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        const results = await fetchMovieByName(query, mediaType)
        setMovies(results)
        if (results && results.length > 0) {
          setExpandedId(results[0].id)
        } else {
          setExpandedId(null)
        }
      } catch (err) {
        console.error('Search error:', err)
        setError('Failed to fetch search results. Please try again.')
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query, mediaType])

  const toggleExpand = id => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  const handleNavigate = movie => {
    const type = movie.media_type === 'tv' ? 'tv' : 'movie'
    navigate(`/${type}/${movie.id}`)
    setIsSearch(false)
  }

  if (!query) {
    return (
      <div className='flex flex-col items-center justify-center py-10 text-slate-500 text-sm'>
        <p>Type a movie or TV show title to search...</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center py-12 text-slate-400 gap-2'>
        <Loader2 className='w-5 h-5 animate-spin text-[#33CC99]' />
        <span className='text-sm'>Searching...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-red-400 text-sm py-8 text-center bg-red-950/20 rounded-xl border border-red-900/30'>
        {error}
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className='py-10 text-center text-slate-400 text-sm'>
        No results found for {query}
      </div>
    )
  }

  return (
    <div
      className='h-full overflow-y-auto space-y-3 pr-1 text-left'
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {movies.map(movie => {
        const isExpanded = expandedId === movie.id
        const title = movie.title || movie.name || 'Untitled'
        const releaseDate = movie.release_date || movie.first_air_date || ''
        const year = releaseDate ? releaseDate.split('-')[0] : 'N/A'
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'
        const mediaLabel = movie.media_type === 'tv' ? 'TV Show' : 'Movie'
        const genres = getGenreNames(movie.genre_ids)

        return (
          <div
            key={movie.id}
            className='rounded-xl transition-all duration-200 overflow-hidden bg-zinc-900/50 hover:bg-zinc-900/80'
          >
            <div
              onClick={() => toggleExpand(movie.id)}
              className='flex relative items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 cursor-pointer select-none'
            >
              <img
                src={getPosterUrl(movie.poster_path, 'w185')}
                alt={title}
                className='w-11 h-16 sm:w-14 sm:h-20 object-cover rounded-lg bg-zinc-950 flex-shrink-0'
              />

              <div className='min-w-0 flex-1 pr-6'>
                <h4 className='font-semibold text-white text-xs sm:text-sm truncate'>
                  {title}
                </h4>
                <div className='flex flex-wrap items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-slate-400 mt-1'>
                  <span className='capitalize'>{mediaLabel}</span>
                  <span>•</span>
                  <span>{year}</span>
                  <span>•</span>
                  <span className='flex items-center text-amber-400 font-medium gap-0.5'>
                    ★ {rating}
                  </span>
                  {genres && (
                    <>
                      <span>•</span>
                      <span className='truncate max-w-[90px] sm:max-w-[150px]'>
                        {genres}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className='absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 text-slate-400'>
                {isExpanded ? (
                  <ChevronUp className='w-4 h-4' />
                ) : (
                  <ChevronDown className='w-4 h-4' />
                )}
              </div>
            </div>

            {isExpanded && (
              <div className='px-2.5 sm:px-3 pb-3 pt-1 text-xs text-slate-300 border-t border-zinc-800/40 mt-0.5'>
                <p className='line-clamp-3 leading-relaxed text-slate-300/90 mb-2.5 text-[11px] sm:text-xs'>
                  {movie.overview || 'No synopsis available.'}
                </p>

                <div className='flex items-center gap-2 pt-0.5'>
                  <button
                    onClick={() => handleNavigate(movie)}
                    className='flex items-center gap-1.5 bg-[#33CC99] text-black hover:bg-[#2bb888] font-bold text-xs px-3.5 py-1.5 rounded-full transition-colors cursor-pointer shadow-sm shadow-[#33CC99]/20'
                  >
                    <Info className='w-3.5 h-3.5' />
                    <span>Watch Details</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default SearchResult
