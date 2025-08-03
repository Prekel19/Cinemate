import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { FilterContext } from "@/models/types";

const SeriesFilterContext = createContext<FilterContext | undefined>(undefined);

export const SeriesFilterContextProvider = ({ children }: PropsWithChildren) => {
  const [genres, setGenres] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [sorting, setSorting] = useState<string>("");

  return (
    <SeriesFilterContext
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
    </SeriesFilterContext>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSeriesFilterContext = () => {
  const context = useContext(SeriesFilterContext);

  if (!context) {
    throw new Error("FilterContext must be used with FilterContextProvider!");
  }

  return context;
};
