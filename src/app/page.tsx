"use client";
import EchoItem from "@/_components/EchoItem";
import Sidebar from "@/_components/Sidebar";
import { GetAllFeeds } from "@/services/fetchDataAPI";
import { useQuery } from "react-query";
export default function Home() {
  const {
    data: feeds,
    error,
    isLoading,
    isError,
  } = useQuery(["AllFeeds"], () => GetAllFeeds());

  if (isLoading) return <p>loading...</p>;
  if (isError) return <div>Error: {error}</div>;
  return (
    <div>
      <Sidebar />
      <main>
        {feeds &&
          feeds.map((feed, index) => (
            <EchoItem content={feed.content} key={index} />
          ))}
      </main>
    </div>
  );
}
