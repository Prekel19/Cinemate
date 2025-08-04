import { SeriesFilterContextProvider } from "@/context/SeriesFilterContext";
import { Outlet } from "react-router";

export const SeriesLayout = () => {
  return (
    <SeriesFilterContextProvider>
      <Outlet />
    </SeriesFilterContextProvider>
  );
};
