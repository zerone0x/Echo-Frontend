"use client";
import EchoItem from "@/_components/EchoItem";
import Sidebar from "@/_components/Sidebar";
import { AuthProvider } from "@/_data/getLogin";
import { GetAllFeeds } from "@/_services/fetchDataAPI";
import { useQuery } from "react-query";
export default function App() {
  const {
    data: feeds,
    error,
    isLoading,
    isError,
  } = useQuery(["AllFeeds"], () => GetAllFeeds());

  if (isLoading) return <p>loading...</p>;
  if (isError) return <div>Error: {error}</div>;
  return (
    <main className="w-full">
      {feeds &&
        feeds.map((feed, index) => (
          <EchoItem content={feed} key={index} />
        ))}
    </main>
  );
}
