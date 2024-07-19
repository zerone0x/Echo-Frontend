"use client";
import AllUserList from "@/app/_components/AllUserList";
import FeedList from "@/app/_components/FeedList";
import SearchBar from "@/app/_components/SearchBar";
import Spinner from "@/app/_components/Spinner";
import { searchFeeds } from "@/app/_services/fetchDataAPI";
import { useSearch } from "@/app/_utils/SearchContext";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";

function Page() {
  const { searchQuery, setSearchQuery } = useSearch();
  // const searchParams = useSearchParams();
  // const q = searchParams.get("q");
  const [feedRes, setFeedRes] = useState([]);
  const [commentRes, setCommentRes] = useState([]);
  const [users, setUsers] = useState([]);

  const {
    data: searchData,
    error,
    isLoading,
  } = useQuery(["Search", searchQuery], () => searchFeeds(searchQuery), {
    enabled: !!searchQuery,
  });
  useEffect(() => {
    return () => {
      setSearchQuery("");
    };
  }, [setSearchQuery]);
  useEffect(() => {
    if (searchData) {
      const { feeds, user, comments } = searchData;
      setFeedRes(feeds.length > 0 ? feeds : []);
      setCommentRes(comments.length > 0 ? comments : []);
      setUsers(user.length > 0 ? user : []);
    }
  }, [searchData]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    const message = error?.message;
    return <div>Error: {message}</div>;
  }

  return (
    <>
      <SearchBar />
      <>
        <AllUserList users={users} />
        <FeedList feeds={feedRes} />
        <FeedList feeds={commentRes} />
      </>
    </>
  );
}

export default Page;
