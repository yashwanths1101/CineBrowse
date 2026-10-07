import { X, Search as SearchIcon, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import SearchResult from './SearchResult'

const Search = ({ setIsSearch }) => {
  const [query, setQuery] = useState('')
  const [mediaType, setMediaType] = useState('all')

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        setIsSearch(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setIsSearch])

  return (
    <div
      onClick={e => {
        if (e.target === e.currentTarget) setIsSearch(false)
      }}
      className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4'
    >
      <div className='w-full max-w-lg md:max-w-xl h-[80vh] max-h-[600px] bg-zinc-950/95 border border-zinc-800/90 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-2xl overflow-hidden flex flex-col my-auto'>
        {/* Header */}
        <div className='flex items-center justify-between mb-1.5 gap-2'>
          <h2 className='text-lg sm:text-xl font-bold text-white tracking-tight'>
            Search
          </h2>

          <div className='flex items-center gap-2 sm:gap-3'>
            {/* Filter Dropdown */}
            <div className='relative'>
              <select
                value={mediaType}
                onChange={e => setMediaType(e.target.value)}
                className='appearance-none bg-zinc-900 border border-zinc-800 text-[11px] sm:text-xs font-medium text-slate-300 rounded-lg pl-2.5 pr-6 py-1.5 focus:outline-none focus:border-zinc-700 cursor-pointer'
              >
                <option value='all'>All Types</option>
                <option value='movie'>Movies</option>
                <option value='tv'>TV Shows</option>
              </select>
              <ChevronDown className='w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none' />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsSearch(false)}
              className='p-1.5 cursor-pointer rounded-lg bg-zinc-900 border border-zinc-800 text-slate-400 hover:text-white hover:bg-zinc-800 transition-colors'
              aria-label='Close search'
            >
              <X className='w-4 h-4' />
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <div className='flex items-center bg-zinc-900/90 border border-zinc-800 focus-within:border-[#33CC99]/80 rounded-xl px-3 py-2 sm:py-2.5 my-1.5 shadow-inner transition-colors'>
          <SearchIcon className='w-4 h-4 text-slate-400 mr-2 flex-shrink-0' />
          <input
            type='text'
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search movies or TV shows...'
            autoFocus
            className='w-full bg-transparent text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none'
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className='text-slate-400 hover:text-white p-0.5 rounded-full hover:bg-zinc-800 cursor-pointer transition-colors flex-shrink-0'
              aria-label='Clear input'
            >
              <X className='w-3.5 h-3.5' />
            </button>
          )}
        </div>

        {/* Search Results */}
        <div className='mt-2 flex-1 overflow-hidden min-h-0'>
          <SearchResult
            query={query}
            mediaType={mediaType}
            setIsSearch={setIsSearch}
          />
        </div>
      </div>
    </div>
  )
}

export default Search
