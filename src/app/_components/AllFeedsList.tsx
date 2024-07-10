"use client";
import { useQuery } from "react-query";
import { GetAllFeeds } from "../_services/fetchDataAPI";
import React, { Fragment, useEffect } from "react";
import Loading from "../loading";
import EchoItem from "./EchoItem";
import SpinnerMini from "./SpinnerMini";
import useInfiniteScroll from "./useInfiniteScroll";
import FeedList from "./FeedList";

function AllFeedsList() {
  const fetchData = ({ pageParam = null }) => GetAllFeeds(pageParam);
  const getNextPageParam = (lastPage: any) => lastPage.cursor;

  const { data, isFetchingNextPage, status, ref } = useInfiniteScroll(
    fetchData,
    getNextPageParam,
  );

  if (status === "loading") return <Loading />;
  if (status === "error") return <div>Error loading feeds.</div>;

  return (
    <div>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          <FeedList feeds={page.data} />
        </Fragment>
      ))}
      <div ref={ref} className="flex justify-center">
        {isFetchingNextPage ? (
          <SpinnerMini />
        ) : (
          "Can you believe you already hit the bottom!"
        )}
      </div>
    </div>
  );
}

export default AllFeedsList;
