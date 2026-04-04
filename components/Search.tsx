"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { searchListings } from "@/lib/action";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const SearchSuggestion = ({ results }: { results: SearchResults[] }) => {
  return (
    <div>
      {results.map((sugg) => (
        <p key={sugg.id}>{sugg.title}</p>
      ))}
    </div>
  );
};

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  const resetResults = async () => setResults([]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      resetResults();
      return;
    }
    searchListings(debouncedQuery).then(setResults);
  }, [debouncedQuery]);

  useEffect(() => {
    // console.log(results);
  }, [results]);

  return (
    <div className="mx-auto max-w-md">
      <form className="flex items-center border  mt-10">
        <div className="flex-1">
          <label htmlFor="search-query" className="sr-only">
            Search query
          </label>
          <input
            type="text"
            id="search-query"
            name="search-query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="focus:outline-none border w-full flex-1"
          />
        </div>
        <button className="grow-0 border cursor-pointer" type="submit">
          <Search />
        </button>
      </form>
      <SearchSuggestion results={results} />
    </div>
  );
};

export default SearchBox;
