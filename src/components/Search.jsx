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
  }, [])

  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
      <div className='w-11/12 sm:w-10/12 md:w-8/12 lg:w-4/12 max-w-2xl h-[80vh] min-h-[520px] max-h-[750px] bg-zinc-950/95 border border-zinc-800/90 rounded-2xl p-6 shadow-2xl overflow-hidden flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between mb-1'>
          <h2 className='text-xl font-bold text-white tracking-tight'>
            Search
          </h2>

          <div className='flex gap-3'>
            {/* Filter Dropdown */}
            <div className='relative'>
              <select
                value={mediaType}
                onChange={e => setMediaType(e.target.value)}
                className='appearance-none bg-zinc-900 border border-zinc-800 text-xs font-medium text-slate-300 rounded-lg pl-3 pr-7 py-1.5 focus:outline-none focus:border-zinc-700 cursor-pointer'
              >
                <option value='all'>Movies & TV Shows</option>
                <option value='movie'>Movies</option>
                <option value='tv'>TV Shows</option>
              </select>
              <ChevronDown className='w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none' />
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
        <div className='flex items-center bg-zinc-900/90 border border-zinc-800 focus-within:border-[#33CC99]/80 rounded-xl px-3 py-2.5 my-2 shadow-inner transition-colors'>
          <SearchIcon className='w-4 h-4 text-slate-400 mr-2' />
          <input
            type='text'
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search movies or TV shows...'
            autoFocus
            className='w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none'
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className='text-slate-400 hover:text-white p-0.5 rounded-full hover:bg-zinc-800 cursor-pointer transition-colors'
              aria-label='Clear input'
            >
              <X className='w-3.5 h-3.5' />
            </button>
          )}
        </div>

        {/* Search Results */}
        <div className='mt-2 flex-1 overflow-hidden'>
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
