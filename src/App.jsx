import { lazy, Suspense } from 'react'
import PageLoader from './components/PageLoader'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
const Navbar = lazy(() => import('./components/Navbar'))

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const MovieDetails = lazy(() => import('./pages/MovieDetails'))
const ErrorMovieDetails = lazy(() => import('./pages/ErrorMovieDetails'))
const MovieBrowseGrid = lazy(() => import('./components/MovieBrowseGrid'))

const RootLayout = () => {
  return (
    <div className='bg-black text-slate-100 min-h-screen flex flex-col font-sans selection:bg-[#33CC99] selection:text-black'>
      <Navbar />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'browse',
        element: <MovieBrowseGrid />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'movie/:id',
        element: <MovieDetails />
      },
      {
        path: 'tv/:id',
        element: <MovieDetails />
      },
      {
        path: '*',
        element: <ErrorMovieDetails />
      }
    ]
  }
])

const App = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
