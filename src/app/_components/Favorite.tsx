"use client";
import { useQuery } from "react-query";
import EchoItem from "./EchoItem";
import NoResult from "./NoResult";
import Loading from "../loading";
import { getAllLikes } from "../_services/fetchDataAPI";
import { BookLikeProps } from "../_config/type";

function Favorite() {
  const { data, error, isLoading } = useQuery("likes", () => getAllLikes());

  if (isLoading) return <Loading />;
  if (error instanceof Error)
    return <div>Error loading Favorited Echos: {error.message}</div>;

  return (
    <div>
      {data && data.length > 0 ? (
        <div>
          {data.map((item: BookLikeProps) => (
            <EchoItem
              key={item?.bookmarkedItem._id}
              feed={item?.bookmarkedItem}
            />
          ))}
        </div>
      ) : (
        <NoResult content="You don't have any favorite posts yet. When you favorite one, it will show up here." />
      )}
    </div>
  );
}

export default Favorite;
