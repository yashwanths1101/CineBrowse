import { Link, NavLink } from "react-router-dom";
import { Home as HomeIcon, Grid, Info, Mail } from "lucide-react";

const Navbar = () => {
  return (
    <header className="top-0 z-1 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-[#33CC99] font-bold text-xl hover:opacity-90 transition-opacity"
        >
          <svg
            width="2.5rem"
            height="2.5rem"
            viewBox="0 0 1024 1024"
            className="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M861.9 383.8H218.1c-36.4 0-66.1-29.8-66.1-66.1V288c0-36.4 29.8-66.1 66.1-66.1h643.8c36.4 0 66.1 29.8 66.1 66.1v29.7c0 36.3-29.8 66.1-66.1 66.1z"
              fill="#FFB89A"
            />
            <path
              d="M822.9 129.2H199.8c-77.2 0-140.4 63.2-140.4 140.4v487.2c0 77.2 63.2 140.4 140.4 140.4h623.1c77.2 0 140.4-63.2 140.4-140.4V269.6c0-77.2-63.2-140.4-140.4-140.4z m80.4 177H760.4L864.6 201c5.4 3.3 10.4 7.3 15 11.8 15.3 15.3 23.7 35.4 23.7 56.8v36.6z m-673.3 0l104-117h61.3l-109.1 117H230z m247.4-117h169.2L532 306.2H368.3l109.1-117z m248.8 0h65.6L676 306.2h-60l112.5-114.8-2.3-2.2zM143 212.9c15.3-15.3 35.4-23.7 56.8-23.7h53.9l-104 117h-30.4v-36.5c0.1-21.4 8.5-41.5 23.7-56.8z m736.6 600.7c-15.3 15.3-35.4 23.7-56.8 23.7h-623c-21.3 0-41.5-8.4-56.8-23.7-15.3-15.3-23.7-35.4-23.7-56.8V366.2h783.9v390.6c0.1 21.3-8.3 41.5-23.6 56.8z"
              fill="#94A3B8"
            />
            <path
              d="M400.5 770.6V430.9L534.1 508c14.3 8.3 19.3 26.6 11 41-8.3 14.3-26.6 19.3-41 11l-43.6-25.2v131.8l114.1-65.9-7.5-4.3c-14.3-8.3-19.3-26.6-11-41 8.3-14.3 26.6-19.3 41-11l97.5 56.3-294.1 169.9z"
              fill="#33CC99"
            />
          </svg>
          <span>CineBrowse</span>
        </Link>

        <nav className="flex items-center gap-8 text-md font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-[#33CC99] font-semibold flex items-center gap-1.5"
                : "text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            }
          >
            <HomeIcon className="w-4 h-4" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/browse"
            className={({ isActive }) =>
              isActive
                ? "text-[#33CC99] font-semibold flex items-center gap-1.5"
                : "text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            }
          >
            <Grid className="w-4 h-4" />
            <span>Browse</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-[#33CC99] font-semibold flex items-center gap-1.5"
                : "text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            }
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-[#33CC99] font-semibold flex items-center gap-1.5"
                : "text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            }
          >
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
