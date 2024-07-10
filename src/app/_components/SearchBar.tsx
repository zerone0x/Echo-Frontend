"use client";
import { useState } from "react";
import { searchFeeds } from "../_services/fetchDataAPI";
import FeedList from "./FeedList";
import UserCard from "./UserCard";
import AllUserList from "./AllUserList";
import { useRouter } from "next/navigation";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [feedRes, setFeedRes] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
    const { feeds, user } = await searchFeeds(query);
    if (feeds.length) {
      setFeedRes(feeds);
    } else {
      setFeedRes([]);
    }
    if (user.length) {
      setUsers(user);
    } else {
      setUsers([]);
    }
    router.push("/search");
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Search Echo"
          className="w-full rounded-full px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-[#5648c4] focus:ring-opacity-50"
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
      <AllUserList users={users} />
      <FeedList feeds={feedRes} />
    </>
  );
}

export default SearchBar;
