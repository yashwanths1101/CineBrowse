import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-slate-100 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-[#33CC99] mb-4">
          About CineBrowse
        </h1>
        <p className="text-slate-300 leading-relaxed">
          CineBrowse is a movie discovery platform that allows users to
          discover, search, and filter movies based on their preference.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li>Movie browsing interface</li>
          <li>Hero Banner featuring top trending content</li>
          <li>TOP 10 Today section with rank badge</li>
          <li>Category rows with horizontal smooth scroll controls</li>
          <li>Shimmer loading UI for improved user experience</li>
          <li>Fast client-side navigation with React Router</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Technologies</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          <li>React</li>
          <li>React Router</li>
          <li>Tailwind CSS</li>
          <li>TMDB API</li>
          <li>JavaScript</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
