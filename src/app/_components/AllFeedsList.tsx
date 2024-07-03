"use client";
import { useQuery } from "react-query";
import { GetAllFeeds } from "../_services/fetchDataAPI";
import React, { Fragment, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import Loading from "../loading";
import EchoItem from "./EchoItem";
import SpinnerMini from "./SpinnerMini";

function AllFeedsList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(
      "feeds",
      ({ pageParam = null }) => GetAllFeeds(pageParam),
      {
        getNextPageParam: (lastPage) => {
          console.log("Last page data:", lastPage.cursor);
          return lastPage.cursor;
        },
      },
    );

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "loading") return <Loading />;
  if (status === "error") return <div>Error loading feeds.</div>;
  console.log(data);

  return (
    <div>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.data.map((feed) => (
            <EchoItem key={feed.id} feed={feed} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} className="flex justify-center">
        {isFetchingNextPage ? <SpinnerMini /> : "End of the list"}
      </div>
    </div>
  );
}

export default AllFeedsList;
