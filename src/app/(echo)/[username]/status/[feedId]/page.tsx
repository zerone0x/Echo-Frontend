import BackBtn from "@/app/_components/BackBtn";
import Content from "@/app/_components/Content";
import EchoItem from "@/app/_components/EchoItem";
import Spinner from "@/app/_components/Spinner";
import UserDetail from "@/app/_components/UserDetail";
import { GetAllFeeds, GetFeedById } from "@/app/_services/fetchDataAPI";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const feed = await GetFeedById(params.feedId);
  const feedContent =
    feed && feed.content && feed.content.length > 30
      ? feed.content.slice(30) + "..."
      : feed?.content;
  return { title: `${feed?.user?.name}: "${feedContent}"` };
}

async function page({ params }) {
  const username = params.username;
  const feed = await GetFeedById(params.feedId);
  return (
    <>
      <UserDetail username={username} />
      {feed && <EchoItem feed={feed} />}
    </>
  );
}

export default page;
