"use client";
import { useState } from "react";
import { searchFeeds } from "../_services/fetchDataAPI";
import FeedList from "./FeedList";
import UserCard from "./UserCard";
import AllUserList from "./AllUserList";
import { useRouter } from "next/navigation";

function SearchBar({ isShow = false }) {
  const [query, setQuery] = useState("");
  const [feedRes, setFeedRes] = useState([]);
  const [commentRes, setCommentRes] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();
  async function handleSubmit(event: any) {
    event.preventDefault();
    const { feeds, user, comments } = await searchFeeds(query);
    if (feeds.length > 0) {
      setFeedRes(feeds);
    } else {
      setFeedRes([]);
    }
    if (comments.length > 0) {
      setCommentRes(comments);
    } else {
      setCommentRes([]);
    }
    if (user.length > 0) {
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
      {isShow && (
        <>
          <AllUserList users={users} />
          <FeedList feeds={feedRes} />
          <FeedList feeds={commentRes} />
        </>
      )}
    </>
  );
}

export default SearchBar;
