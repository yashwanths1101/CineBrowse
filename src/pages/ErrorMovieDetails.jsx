import React from "react";
import { Link } from "react-router-dom";

const ErrorMovieDetails = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-16 text-slate-100">
      <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 text-[#33CC99] shadow-lg shadow-[#33CC99]/10">
        <svg
          className="w-10 h-10 stroke-current fill-none stroke-2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>

      <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">
        Movie Not Found
      </h1>

      <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
        Sorry, the movie, show, or page you are looking for could not be found
        or does not exist in our database.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-[#33CC99] hover:bg-[#2bb888] text-black font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-[#33CC99]/20"
      >
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default ErrorMovieDetails;
