import { Link } from 'react-router-dom'
import { getPosterUrl, getBackdropUrl } from '../utils/constants'

const MovieCard = ({ movie, variant = 'vertical', rank = null }) => {
  if (!movie) return null

  console.log(movie)

  const title = movie.title || movie.name || 'Untitled'
  const releaseDate = movie.release_date || movie.first_air_date || ''
  const year = releaseDate ? releaseDate.split('-')[0] : 'N/A'
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
  const mediaType = movie.media_type === 'tv' ? 'TV Show' : 'Movie'

  const detailPath =
    movie.media_type === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`

  const isHorizontal = variant === 'horizontal'

  return (
    <Link
      to={detailPath}
      className={`group relative flex-shrink-0 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${
        isHorizontal ? 'w-64 md:w-80' : 'w-40 sm:w-48 md:w-52'
      }`}
    >
      <div className='relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800/80 shadow-lg group-hover:border-[#33CC99]/50 group-hover:shadow-[#33CC99]/20'>
        {/* top rank badge */}
        {rank !== null && (
          <div className='absolute top-2 left-2 z-10 bg-gradient-to-r from-[#33CC99] to-emerald-600 text-black font-extrabold text-[10px] sm:text-xs px-2 py-0.5 rounded shadow-md uppercase tracking-wider'>
            TOP {String(rank).padStart(2, '0')}
          </div>
        )}

        <img
          src={
            isHorizontal
              ? getBackdropUrl(movie.backdrop_path)
              : getPosterUrl(movie.poster_path)
          }
          alt={title}
          className={`w-full object-cover transition-transform duration-500 group-hover:brightness-110 ${
            isHorizontal ? 'h-36 md:h-44' : 'h-60 sm:h-72'
          }`}
        />

        <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
          <div className='w-11 h-11 rounded-full bg-[#33CC99] text-black flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300'>
            <svg className='w-5 h-5 ml-0.5 fill-current' viewBox='0 0 24 24'>
              <path d='M8 5v14l11-7z' />
            </svg>
          </div>
        </div>
      </div>

      <div className='mt-2.5 px-1'>
        <h3 className='text-sm font-semibold text-slate-100 truncate group-hover:text-[#33CC99] transition-colors'>
          {title}
        </h3>

        <div className='flex items-center space-x-2 mt-1 text-xs text-slate-400 font-medium'>
          <div className='flex items-center text-amber-400 font-semibold'>
            <svg className='w-3.5 h-3.5 mr-1 fill-current' viewBox='0 0 24 24'>
              <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
            </svg>
            {rating}
          </div>

          <span>•</span>
          <span>{year}</span>
          <span>•</span>
          <span className='text-[10px] uppercase px-1.5 py-0.5 bg-slate-800/80 rounded border border-slate-700 text-slate-300'>
            {mediaType}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
