import { seriesGenres, seriesSorting, years } from "@/models/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSeriesFilterContext } from "@/context/SeriesFilterContext";
import "./style.scss";

export const SeriesFilters = () => {
  const { genres, onGenresChange, year, onYearChange, sorting, onSortingChange } =
    useSeriesFilterContext();

  return (
    <div className="media-filters">
      <Select value={genres} onValueChange={(val) => onGenresChange(val)}>
        <SelectTrigger className="media-filters-trigger genres">
          <SelectValue placeholder="All Genres" />
        </SelectTrigger>
        <SelectContent className="media-filters-content">
          {seriesGenres.map((item, index) => (
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
          {seriesSorting.map((item, index) => (
            <SelectItem key={index} className="media-filters-item" value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
