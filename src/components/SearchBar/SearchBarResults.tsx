import type { Search, SearchResults } from "@/models/types";
import { baseImgUrl, posterSizes } from "@/models/data";
import { SearchBarNoResults } from "./SearchBarNoResults";
import { Film, Tv } from "lucide-react";
import { Link } from "react-router";

type SearchBarResultsProps = {
  searchResults: Search;
};

type SearchBarResultProps = {
  searchResult: SearchResults;
  media: "movies" | "series";
  releaseDate: string;
};

export const SearchBarResults = ({ searchResults }: SearchBarResultsProps) => {
  const movies: SearchResults[] = searchResults.results
    .filter((result) => result.media_type === "movie")
    .slice(0, 5);
  const series: SearchResults[] = searchResults.results
    .filter((result) => result.media_type === "tv")
    .slice(0, 5);

  if (!movies.length && !series.length) {
    return <SearchBarNoResults />;
  }
  return (
    <div className="searchbar-results">
      {movies.length > 0 && (
        <div className="searchbar-results-container movies">
          <h3 className="searchbar-results-title">
            <Film size={16} />
            Movies
          </h3>
          {movies.map((movie) => (
            <SearchBarResult
              key={movie.id}
              searchResult={movie}
              releaseDate={movie.release_date || ""}
              media="movies"
            />
          ))}
        </div>
      )}
      {series.length > 0 && (
        <div className="searchbar-results-container series">
          <h3 className="searchbar-results-title">
            <Tv size={16} />
            Tv Shows
          </h3>
          {series.map((show) => (
            <SearchBarResult
              key={show.id}
              searchResult={show}
              releaseDate={show.first_air_date || ""}
              media="series"
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SearchBarResult = ({ searchResult, media, releaseDate }: SearchBarResultProps) => {
  const yearOfRelease = releaseDate ? new Date(releaseDate).getFullYear() : "";
  const img = searchResult.poster_path
    ? `${baseImgUrl}${posterSizes.w92}/${searchResult.poster_path}`
    : undefined;

  return (
    <div className="searchbar-result">
      <Link to={`/${media}/${searchResult.id}`}>
        <div className="searchbar-result-poster">
          <img src={img} alt={`${searchResult.name || searchResult.title} poster`} />
        </div>
        <div className="searchbar-result-info">
          <h4 className="searchbar-result-title">
            {searchResult.name || searchResult.title}
          </h4>
          <p className="searchbar-result-release-date">{yearOfRelease}</p>
        </div>
      </Link>
    </div>
  );
};
