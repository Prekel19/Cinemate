import { moviesGenres, seriesGenres, years } from "@/models/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import "./style.scss";
import type { Genres } from "@/models/types";

type MediaFiltersProps = {
  mediaType: "movie" | "tv";
};

export const MediaFilters = ({ mediaType }: MediaFiltersProps) => {
  const genres: Genres[] = mediaType === "movie" ? moviesGenres : seriesGenres;

  return (
    <div className="media-filters">
      <Select>
        <SelectTrigger className="media-filters-trigger">
          <SelectValue placeholder="Genres" />
        </SelectTrigger>
        <SelectContent className="media-filters-content">
          {genres.map((item) => (
            <SelectItem className="media-filters-item" value={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="media-filters-trigger">
          <SelectValue placeholder="Release Year" />
        </SelectTrigger>
        <SelectContent className="media-filters-content">
          {years.map((year) => (
            <SelectItem className="media-filters-item" value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
