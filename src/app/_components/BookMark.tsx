"use client";
import { useQuery } from "react-query";
import EchoItem from "./EchoItem";
import NoResult from "./NoResult";
import { getAllBookMark } from "../_services/fetchDataAPI";
import Loading from "../loading";
import { BookLikeProps } from "../_config/type";

function BookMark() {
  const { data, error, isLoading } = useQuery("bookmark", () =>
    getAllBookMark(),
  );

  if (isLoading) return <Loading />;
  if (error instanceof Error)
    return <div>Error loading bookmarks: {error.message}</div>;

  return (
    <div>
      {data?.length > 0 ? (
        <div>
          {data.map((item: BookLikeProps) => (
            <EchoItem
              key={item?.bookmarkedItem._id}
              feed={item?.bookmarkedItem}
            />
          ))}
        </div>
      ) : (
        <NoResult content="You don't have any bookmarked posts yet. When you bookmark one, it will show up here." />
      )}
    </div>
  );
}

export default BookMark;
