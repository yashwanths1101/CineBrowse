const ShimmerCard = ({ variant = "vertical" }) => {
  if (variant === "horizontal") {
    return (
      <div className="flex-shrink-0 w-64 md:w-80 rounded-xl bg-slate-900/60 border border-slate-800/50 p-2 animate-pulse">
        <div className="w-full h-36 md:h-44 bg-slate-800/80 rounded-lg mb-3"></div>
        <div className="h-4 bg-slate-800 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-slate-800/60 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 w-40 sm:w-48 md:w-52 rounded-xl bg-slate-900/60 border border-slate-800/50 p-2 animate-pulse">
      <div className="w-full h-60 sm:h-72 bg-slate-800/80 rounded-lg mb-3"></div>
      <div className="h-4 bg-slate-800 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-slate-800/60 rounded w-1/2"></div>
    </div>
  );
};

export default ShimmerCard;
