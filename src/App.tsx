import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import { MainLayout } from "./components/Layout/MainLayout";
import { MoviesLayout } from "./components/Layout/MoviesLayout";
import { SeriesLayout } from "./components/Layout/SeriesLayout";
import { Home } from "./pages/Home";
import { SeriesDetails } from "./pages/SeriesDetails";
import { MovieDetails } from "./pages/MoviesDetails";
import { Watchlist } from "./pages/Watchlist";
import { Movies } from "./pages/Movies";
import { Series } from "./pages/Series";
import { Search } from "./pages/Search";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/movies",
          element: <MoviesLayout />,
          children: [
            {
              index: true,
              element: <Movies />,
            },
            {
              path: "/movies/:id",
              element: <MovieDetails />,
            },
          ],
        },
        {
          path: "series",
          element: <SeriesLayout />,
          children: [
            {
              index: true,
              element: <Series />,
            },
            {
              path: "/series/:id",
              element: <SeriesDetails />,
            },
          ],
        },

        {
          path: "/watchlist",
          element: <Watchlist />,
        },
        {
          path: "/search/:search",
          element: <Search />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
