"use client";
import EchoItem from "@/_components/EchoItem";
import Sidebar from "@/_components/Sidebar";
import { GetAllFeeds } from "@/_services/fetchDataAPI";
import Link from "next/link";
import { useQuery } from "react-query";
import Loading from "../loading";
import { Metadata } from "next";

export default async function Home() {
  // const {
  //   data: feeds,
  //   error,
  //   isLoading,
  //   isError,
  // } = useQuery(["AllFeeds"], () => GetAllFeeds());

  // if (isLoading) return <Loading />;
  // if (isError) return <div>Error: {error}</div>;
  console.log("starting");
  const feeds = await GetAllFeeds();
  return (
    <div>
      <main>
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/signup">Register</Link>
        {feeds &&
          feeds.map((feed: object, index: number) => (
            <EchoItem feed={feed} key={index} />
          ))}
      </main>
    </div>
  );
}
