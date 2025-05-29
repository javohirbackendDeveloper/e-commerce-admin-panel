import { Search } from "lucide-react";
import React from "react";
import { useSearch } from "./SearchContext";

function SearchInput() {
  const { query, setQuery } = useSearch();

  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Qidiring..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Search />
    </div>
  );
}

export default SearchInput;
