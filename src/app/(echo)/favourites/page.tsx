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

function FavoritePage() {
  const { currentUserId } = useAuth();

  const { data, error, isLoading } = useQuery(
    "likes",
    () => getAllLikes(currentUserId),
    {
      enabled: !!currentUserId,
    },
  );

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading Favorited Echos: {error.message}</div>;

  return (
    <div>
      {data && data.length > 0 ? (
        <div>
          {data.map((item, index) => (
            <EchoItem key={item?.feed._id} feed={item?.feed} />
          ))}
        </div>
      ) : (
        <div>No favorited Echos available.</div>
      )}
    </div>
  );
}

export default FavoritePage;
