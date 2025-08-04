import { getTmdbApi } from "@/utility/getTmdbApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import type { Search as SearchResults } from "@/models/types";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";
import { MediaTile } from "@/components/MediaTile/MediaTile";

export const Search = () => {
  const { search } = useParams();

  const formatedSearch: string = search ? search?.split("-").join(" ") : "";

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["searchbar", { search }],
    queryFn: () =>
      getTmdbApi<SearchResults>("search/multi", {
        query: formatedSearch,
        include_adult: false,
        language: "en-US",
      }),
    enabled: !!formatedSearch,
  });

  if (isError) {
    return <div className="fetch-error">{error?.message}</div>;
  }

  if (isPending) {
    return <LoadingSpinner />;
  }

  const filteredSearch = data.results.filter((item) => item.media_type !== "person");

  return (
    <div className="search">
      <h3 className="search-title">Results for "{formatedSearch}"</h3>
      <div className="search-content media-tiles-container">
        {filteredSearch.map((result) => (
          <MediaTile
            key={result.id}
            id={result.id}
            imgUrl={result.poster_path}
            title={result.name || result.title || ""}
            mediaType={result.media_type}
            rating={result.vote_average}
            releaseDate={result.first_air_date || result.release_date || ""}
          />
        ))}
      </div>
    </div>
  );
};
