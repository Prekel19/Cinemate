import { MoviesFilterContextProvider } from "@/context/MoviesFilterContext";
import { Outlet } from "react-router";

export const MoviesLayout = () => {
  return (
    <MoviesFilterContextProvider>
      <Outlet />
    </MoviesFilterContextProvider>
  );
};
