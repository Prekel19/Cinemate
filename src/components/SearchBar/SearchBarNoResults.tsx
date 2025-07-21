import { Search } from "lucide-react";

export const SearchBarNoResults = ({ search }: { search?: string }) => {
  return (
    <div className="searchbar-results no-results">
      <div className="search-icon-wrapper">
        <Search size={24} color="#9ca3af" />
      </div>
      <h3 className="searchbar-no-results-title">
        No results found {search ? `for "${search}"` : ""}
      </h3>
      <p className="searchbar-no-results-subtitle">
        Try different keywords or check the spelling
      </p>
    </div>
  );
};
