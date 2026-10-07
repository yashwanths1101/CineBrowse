import { Link, NavLink } from 'react-router-dom'
import {
  Home as HomeIcon,
  Grid,
  Info,
  Mail,
  Search as SearchIcon,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import Search from './Search.jsx'

const Navbar = () => {
  const [isSearch, setIsSearch] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Home', icon: HomeIcon },
    { to: '/browse', label: 'Browse', icon: Grid },
    { to: '/about', label: 'About', icon: Info },
    { to: '/contact', label: 'Contact', icon: Mail }
  ]

  return (
    <header className='relative z-[100] bg-transparent w-full'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between'>
        <Link
          to='/'
          onClick={() => setIsMenuOpen(false)}
          className='flex items-center gap-2 text-[#33CC99] font-bold text-lg sm:text-xl hover:opacity-90 transition-opacity'
        >
          <svg
            width='2.25rem'
            height='2.25rem'
            viewBox='0 0 1024 1024'
            className='icon w-8 h-8 sm:w-10 sm:h-10'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M861.9 383.8H218.1c-36.4 0-66.1-29.8-66.1-66.1V288c0-36.4 29.8-66.1 66.1-66.1h643.8c36.4 0 66.1 29.8 66.1 66.1v29.7c0 36.3-29.8 66.1-66.1 66.1z'
              fill='#FFB89A'
            />
            <path
              d='M822.9 129.2H199.8c-77.2 0-140.4 63.2-140.4 140.4v487.2c0 77.2 63.2 140.4 140.4 140.4h623.1c77.2 0 140.4-63.2 140.4-140.4V269.6c0-77.2-63.2-140.4-140.4-140.4z m80.4 177H760.4L864.6 201c5.4 3.3 10.4 7.3 15 11.8 15.3 15.3 23.7 35.4 23.7 56.8v36.6z m-673.3 0l104-117h61.3l-109.1 117H230z m247.4-117h169.2L532 306.2H368.3l109.1-117z m248.8 0h65.6L676 306.2h-60l112.5-114.8-2.3-2.2zM143 212.9c15.3-15.3 35.4-23.7 56.8-23.7h53.9l-104 117h-30.4v-36.5c0.1-21.4 8.5-41.5 23.7-56.8z m736.6 600.7c-15.3 15.3-35.4 23.7-56.8 23.7h-623c-21.3 0-41.5-8.4-56.8-23.7-15.3-15.3-23.7-35.4-23.7-56.8V366.2h783.9v390.6c0.1 21.3-8.3 41.5-23.6 56.8z'
              fill='#94A3B8'
            />
            <path
              d='M400.5 770.6V430.9L534.1 508c14.3 8.3 19.3 26.6 11 41-8.3 14.3-26.6 19.3-41 11l-43.6-25.2v131.8l114.1-65.9-7.5-4.3c-14.3-8.3-19.3-26.6-11-41 8.3-14.3 26.6-19.3 41-11l97.5 56.3-294.1 169.9z'
              fill='#33CC99'
            />
          </svg>
          <span>CineBrowse</span>
        </Link>

        <div className='flex items-center gap-4 sm:gap-6'>
          <button
            className='text-slate-300 hover:text-white cursor-pointer transition-colors p-1'
            onClick={() => {
              setIsSearch(!isSearch)
              setIsMenuOpen(false)
            }}
            aria-label='Search'
          >
            <SearchIcon className='w-5 h-5 sm:w-6 sm:h-6' />
          </button>
          {isSearch && <Search setIsSearch={setIsSearch} />}

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-8 text-md font-medium'>
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? 'text-[#33CC99] font-semibold flex items-center gap-1.5'
                    : 'text-slate-300 hover:text-white transition-colors flex items-center gap-1.5'
                }
              >
                <Icon className='w-4 h-4' />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            className='md:hidden text-slate-300 hover:text-white cursor-pointer transition-colors p-1 focus:outline-none'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Toggle navigation menu'
          >
            {isMenuOpen ? (
              <X className='w-6 h-6 text-[#33CC99]' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div>
          <div
            className='md:hidden fixed inset-0 z-40 bg-black/60'
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className='md:hidden absolute top-full left-0 w-full z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3 flex flex-col gap-1 shadow-2xl animate-in slide-in-from-top duration-200'>
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#33CC99] bg-[#33CC99]/10 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-zinc-900'
                  }`
                }
              >
                <Icon className='w-4 h-4' />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
