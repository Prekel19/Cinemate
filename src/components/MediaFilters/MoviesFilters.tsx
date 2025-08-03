import { moviesGenres, movieSorting, years } from "@/models/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMoviesFilterContext } from "@/context/MoviesFilterContext";
import "./style.scss";

export const MoviesFilters = () => {
  const { genres, onGenresChange, year, onYearChange, sorting, onSortingChange } =
    useMoviesFilterContext();

  return (
    <div className="media-filters">
      <Select value={genres} onValueChange={(val) => onGenresChange(val)}>
        <SelectTrigger className="media-filters-trigger genres">
          <SelectValue placeholder="All Genres" />
        </SelectTrigger>
        <SelectContent className="media-filters-content">
          {moviesGenres.map((item, index) => (
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

      <Select value={year} onValueChange={(val) => onYearChange(val)}>
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

      <Select value={sorting} onValueChange={(val) => onSortingChange(val)}>
        <SelectTrigger className="media-filters-trigger sorting">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="media-filters-content">
          {movieSorting.map((item, index) => (
            <SelectItem key={index} className="media-filters-item" value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
