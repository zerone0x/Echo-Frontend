"use client";
import { useQuery } from "react-query";
import EchoItem from "./EchoItem";

import { GetAllFeeds } from "../_services/fetchDataAPI";
import Loading from "../loading";

function AllFeedsList() {
  const { data, error, isLoading } = useQuery("feeds", GetAllFeeds);

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading feeds.</div>;

  return (
    <div>
      {data.map((feed) => (
        <EchoItem key={feed.id} feed={feed} user={feed?.user} />
      ))}
    </div>
  );
}

export default AllFeedsList;
