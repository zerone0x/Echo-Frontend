"use client";
import EchoItem from "@/app/_components/EchoItem";
import { getAllBookMark } from "@/app/_services/fetchDataAPI";
import { useAuth } from "@/app/_utils/getLogin";

import Head from "next/head";
import { useQuery } from "react-query";
import { BsDatabaseDash } from "react-icons/bs";
import Loading from "@/app/loading";

function BookmarkPage() {
  const { currentUserId } = useAuth();

  const { data, error, isLoading } = useQuery(
    "bookmark",
    () => getAllBookMark(currentUserId),
    {
      enabled: !!currentUserId,
    },
  );

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading bookmarks: {error.message}</div>;

  return (
    <div>
      <Head>
        <title>Bookmark</title>
      </Head>
      <h1>Bookmark</h1>
      {data && data.length > 0 ? (
        <div>
          {data.map((item, index) => (
            <EchoItem key={item?.feed._id} feed={item?.feed} />
            // <h1>{item.id}</h1>
          ))}
        </div>
      ) : (
        <div>No bookmarks available.</div>
      )}
    </div>
  );
}

export default BookmarkPage;
