"use client";
import { useRouter } from "next/navigation";
import { useSearch } from "../_utils/SearchContext";
import { useState, useEffect } from "react";

function SearchBar() {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useSearch();
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    debounceSearch(value);
  };

  // Debounce function to delay the setSearchQuery call
  type AnyFunction = (...args: any[]) => any;

  function debounce<T extends AnyFunction>(
    func: T,
    delay: number,
  ): (...args: Parameters<T>) => void {
    let timerId: NodeJS.Timeout | undefined;

    return (...args: Parameters<T>) => {
      if (timerId) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  // Create a debounced version of setSearchQuery
  const debounceSearch = debounce((value: string) => {
    setSearchQuery(value);
  }, 1000);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/search`);
  }

  useEffect(() => {
    // Update the local state when the searchQuery changes externally
    setInputValue(searchQuery);
  }, [searchQuery]);

  return (
    <div className="w-full bg-[#F3FFF9] p-4">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Search Echo"
          className="h-12 w-full rounded-full px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-[#5648c4] focus:ring-opacity-50"
          value={inputValue}
          onChange={(event: any) => handleInputChange(event.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchBar;
