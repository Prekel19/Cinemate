import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { useQuery } from "@tanstack/react-query";
import { getTmdbApi } from "@/utility/getTmdbApi";
import type { Search } from "@/models/types";
import "./style.scss";

export const SearchBar = () => {
  const [search, setSearch] = useState<string>("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInput = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 600),
    []
  );

  const { data, isPending, isError } = useQuery({
    queryKey: ["searchbar"],
    queryFn: () =>
      getTmdbApi<Search>("search/multi", {
        query: search,
        include_adult: false,
        language: "en-US",
        page: 1,
      }),
    enabled: !!search,
  });

  return (
    <div className="searchbar">
      <div className="searchbar-input">
        <input
          type="text"
          placeholder="Search movies, TV series, and more..."
          onChange={(e) => handleInput(e.target.value)}
        />
      </div>
    </div>
  );
};
