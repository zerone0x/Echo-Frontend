"use client";
import { GetAllFeeds } from "../_services/fetchDataAPI";
import React, { Fragment, useEffect } from "react";
import Loading from "../loading";
import SpinnerMini from "./SpinnerMini";
import useInfiniteScroll from "./useInfiniteScroll";
import FeedList from "./FeedList";
import { FeedProps } from "../_config/type";

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
      {data?.pages.map((page: any, i: number) => (
        <Fragment key={i}>
          <FeedList feeds={page.data as FeedProps[]} />
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
