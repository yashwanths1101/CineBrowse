import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col font-sans selection:bg-[#33CC99] selection:text-black">
      <Navbar />
      <Outlet />
    </div>
  );
};

const Browse = () => <div className="p-8 text-center">Browse Page</div>;
const About = () => <div className="p-8 text-center">About Page</div>;
const Contact = () => <div className="p-8 text-center">Contact Page</div>;
const MovieDetails = () => (
  <div className="p-8 text-center">Movie Details Page</div>
);

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
        path: "explore",
        element: <Browse />,
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
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
