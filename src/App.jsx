import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MovieDetails from "./pages/MovieDetails";
import ErrorMovieDetails from "./pages/ErrorMovieDetails";
import MovieBrowseGrid from "./components/MovieBrowseGrid";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col font-sans selection:bg-[#33CC99] selection:text-black">
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "browse",
        element: <MovieBrowseGrid />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "tv/:id",
        element: <MovieDetails />,
      },
      {
        path: "*",
        element: <ErrorMovieDetails />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
