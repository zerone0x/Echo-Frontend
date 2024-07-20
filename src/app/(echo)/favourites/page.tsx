"use client";
import EchoItem from "@/app/_components/EchoItem";
import { getAllBookMark, getAllLikes } from "@/app/_services/fetchDataAPI";
import { useAuth } from "@/app/_utils/getLogin";
import Head from "next/head";
import { useQuery } from "react-query";
import Loading from "@/app/loading";
import Header from "@/app/_components/Header";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import NoResult from "@/app/_components/NoResult";

function FavoritePage() {
  const { data, error, isLoading } = useQuery("likes", () => getAllLikes());

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading Favorited Echos: {error.message}</div>;

  return (
    <div>
      {data && data.length > 0 ? (
        <div>
          {data.map((item, index) => (
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

export default FavoritePage;
