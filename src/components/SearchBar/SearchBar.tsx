import { useCallback, useEffect, useRef, useState } from "react";
import { SearchBarResults } from "./SearchBarResults";
import { SearchBarNoResults } from "./SearchBarNoResults";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { getTmdbApi } from "@/utility/getTmdbApi";
import { Search as SearchIcon, X } from "lucide-react";
import { BeatLoader } from "react-spinners";
import type { Search } from "@/models/types";
import debounce from "lodash.debounce";
import "./style.scss";

export const SearchBar = () => {
  const [search, setSearch] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInput = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 600),
    []
  );

  const {
    data: searchResults,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["searchbar", { search }],
    queryFn: () =>
      getTmdbApi<Search>("search/multi", {
        query: search.trim().toLocaleLowerCase(),
        include_adult: false,
        language: "en-US",
        page: 1,
      }),
    enabled: !!search,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      setShowResults(searchContainerRef.current?.contains(event.target as Node) ?? false);
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClearSearch = () => {
    if (searchInputRef.current) searchInputRef.current.value = "";
    setShowResults(false);
    setSearch("");
  };

  if (isError) {
    console.log(error);
  }

  return (
    <div className="searchbar">
      <div className="searchbar-container" ref={searchContainerRef}>
        <div className={`searchbar-input ${showResults ? "active" : ""}`}>
          <SearchIcon color="#374151" />
          <div className="searchbar-input-field">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search movies, TV series, and more..."
              onChange={(e) => handleInput(e.target.value)}
            />
            {search && (
              <div className="searchbar-clear" onClick={handleClearSearch}>
                <X size={20} />
              </div>
            )}
          </div>
          <Button className="searchbar-btn">
            {isLoading ? <BeatLoader color="#fff" size={12} /> : "Search"}
          </Button>
        </div>
        {showResults &&
          searchResults &&
          (searchResults.total_results !== 0 ? (
            <SearchBarResults searchResults={searchResults} />
          ) : (
            <SearchBarNoResults search={search} />
          ))}
      </div>
    </div>
  );
};
