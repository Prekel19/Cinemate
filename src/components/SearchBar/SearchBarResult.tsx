import { baseImgUrl, posterSizes } from "@/models/data";
import type { SearchResults } from "@/models/types";
import { Link } from "react-router";
import ImageFallback from "@/assets/images/image-fallback-small.png";

type SearchBarResultProps = {
  searchResult: SearchResults;
  media: "movies" | "series";
  releaseDate: string;
};

export const SearchBarResult = ({
  searchResult,
  media,
  releaseDate,
}: SearchBarResultProps) => {
  const yearOfRelease = releaseDate ? new Date(releaseDate).getFullYear() : "";
  const img = searchResult.poster_path
    ? `${baseImgUrl}${posterSizes.w92}/${searchResult.poster_path}`
    : ImageFallback;

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
