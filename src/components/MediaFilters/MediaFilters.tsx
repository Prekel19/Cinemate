import {
  moviesGenres,
  movieSorting,
  seriesGenres,
  seriesSorting,
  years,
} from "@/models/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import "./style.scss";
import type { Genres, Sorting } from "@/models/types";

type FilterState = {
  value: string;
  onChange: (val: string) => void;
};

type MediaFiltersProps = {
  mediaType: "movie" | "tv";
  genresState: FilterState;
  yearState: FilterState;
  sortingState: FilterState;
};

export const MediaFilters = ({
  mediaType,
  genresState,
  yearState,
  sortingState,
}: MediaFiltersProps) => {
  const genres: Genres[] = mediaType === "movie" ? moviesGenres : seriesGenres;
  const sorting: Sorting[] = mediaType === "movie" ? movieSorting : seriesSorting;

  return (
    <div className="media-filters">
      <Select
        value={genresState.value}
        onValueChange={(val) => genresState.onChange(val)}
      >
        <SelectTrigger className="media-filters-trigger genres">
          <SelectValue placeholder="All Genres" />
        </SelectTrigger>
        <SelectContent className="media-filters-content">
          {genres.map((item, index) => (
            <SelectItem
              key={index}
              className="media-filters-item"
              value={String(item.id)}
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={yearState.value} onValueChange={(val) => yearState.onChange(val)}>
        <SelectTrigger className="media-filters-trigger year">
          <SelectValue placeholder="Release Year" />
        </SelectTrigger>
        <SelectContent className="media-filters-content">
          {years.map((year, index) => (
            <SelectItem key={index} className="media-filters-item" value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={sortingState.value}
        onValueChange={(val) => sortingState.onChange(val)}
      >
        <SelectTrigger className="media-filters-trigger sorting">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="media-filters-content">
          {sorting.map((item, index) => (
            <SelectItem key={index} className="media-filters-item" value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
