"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSearch } from "../_utils/SearchContext";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ isDisabled = false }: { isDisabled?: boolean }) {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useSearch();
  const [inputValue, setInputValue] = useState(searchQuery);
  const pathName = usePathname();

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchQuery(inputValue);
    if (pathName !== `/search`) {
      router.push(`/search`);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default form submission
      setSearchQuery(inputValue);
      if (pathName !== `/search`) {
        router.push(`/search`);
      }
    }
  }

  useEffect(() => {
    // Update the local state when the searchQuery changes externally
    setInputValue(searchQuery);
  }, [searchQuery]);

  return (
    <div className="w-full bg-[#F3FFF9] p-4">
      <form onSubmit={handleSubmit} className="flex h-12">
        <input
          type="text"
          placeholder="Search Echo"
          className="w-full rounded-full px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-[#5648c4] focus:ring-opacity-50"
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event.target.value)
          }
          disabled={isDisabled}
        />
        <button type="submit">
          <FaSearch className="h-6 w-6 text-gray-600" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
