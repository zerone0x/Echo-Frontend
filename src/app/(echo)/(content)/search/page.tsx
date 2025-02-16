"use client";
import AllUserList from "@/app/_components/AllUserList";
import FeedList from "@/app/_components/FeedList";
import SearchBar from "@/app/_components/SearchBar";
import Spinner from "@/app/_components/Spinner";
import { searchFeeds } from "@/app/_services/fetchDataAPI";
import { useSearch } from "@/app/_utils/SearchContext";
import { Suspense, useEffect, useState } from "react";
import { useQuery } from "react-query";
import NoResult from "@/app/_components/NoResult";
import { LuUsers2 } from "react-icons/lu";
import SearchHeader from "@/app/_components/SearchHeader";
import { MdOutlineArticle } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";

function Page() {
  const { searchQuery, setSearchQuery } = useSearch();
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

  if (error instanceof Error) {
    const message = error?.message;
    return <div>Error: {message}</div>;
  }

  return (
    <>
      <SearchBar isDisabled={isLoading} />
      <Suspense fallback={<Spinner />}>
        {!users.length &&
        !feedRes.length &&
        !commentRes.length &&
        searchQuery.length ? (
          <NoResult content="Could not find anything for these search terms" />
        ) : (
          <>
            {users?.length > 0 && (
              <SearchHeader header="Profiles" icon={<LuUsers2 size={24} />} />
            )}
            <AllUserList users={users} />
            {feedRes?.length > 0 && (
              <SearchHeader
                header="Posts"
                icon={<MdOutlineArticle size={24} />}
              />
            )}
            <FeedList feeds={feedRes} />
            {commentRes?.length > 0 && (
              <SearchHeader
                header="Comments"
                icon={<FaRegComment size={24} />}
              />
            )}
            <FeedList feeds={commentRes} />
          </>
        )}
      </Suspense>
    </>
  );
}

export default Page;
