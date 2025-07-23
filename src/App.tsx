import { createBrowserRouter, RouterProvider } from "react-router";
import { MainLayout } from "./components/Layout/MainLayout";
import { Home } from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SeriesDetails } from "./pages/SeriesDetails";
import { MovieDetails } from "./pages/MoviesDetails";

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
          path: "/movies/:id",
          element: <MovieDetails />,
        },
        {
          path: "series/:id",
          element: <SeriesDetails />,
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
