"use client";
import { useState } from "react";
import { searchFeeds } from "../_services/fetchDataAPI";

function SearchBar() {
  const [query, setQuery] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    const { feeds, user } = await searchFeeds(query);
    console.log(feeds);
    console.log(user);
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Search Echo"
        className="w-full rounded-full px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-[#5648c4] focus:ring-opacity-50"
        onChange={(event) => setQuery(event.target.value)}
      />
    </form>
  );
}

export default SearchBar;
