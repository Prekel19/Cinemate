import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { FilterContext } from "@/models/types";

const MoviesFilterContext = createContext<FilterContext | undefined>(undefined);

export const MoviesFilterContextProvider = ({ children }: PropsWithChildren) => {
  const [genres, setGenres] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [sorting, setSorting] = useState<string>("");

  return (
    <MoviesFilterContext
      value={{
        onGenresChange: setGenres,
        genres,
        onYearChange: setYear,
        year,
        onSortingChange: setSorting,
        sorting,
      }}
    >
      {children}
    </MoviesFilterContext>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMoviesFilterContext = () => {
  const context = useContext(MoviesFilterContext);

  if (!context) {
    throw new Error("FilterContext must be used with FilterContextProvider!");
  }

  return context;
};
