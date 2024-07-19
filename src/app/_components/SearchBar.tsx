"use client";
import { useRouter } from "next/navigation";
import { useSearch } from "../_utils/SearchContext";

function SearchBar() {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useSearch();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/search`);
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Search Echo"
          className="w-full rounded-full px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-[#5648c4] focus:ring-opacity-50"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </form>
    </>
  );
}

export default SearchBar;
