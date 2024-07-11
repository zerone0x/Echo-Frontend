import BackBtn from "@/app/_components/BackBtn";
import EchoItem from "@/app/_components/EchoItem";
import FeedList from "@/app/_components/FeedList";
import Spinner from "@/app/_components/Spinner";
import UserDetail from "@/app/_components/UserDetail";
import { Params } from "@/app/_config/type";
import {
  GetAllFeeds,
  getCommentsByFeedID,
  GetFeedById,
} from "@/app/_services/fetchDataAPI";
import { Metadata } from "next";
import { Suspense } from "react";

// auto generate title for each feed
export async function generateMetadata({ params }: { params: Params }) {
  const feed = await GetFeedById(params.feedId);
  const feedContent =
    feed && feed.content && feed.content.length > 30
      ? feed.content.slice(30) + "..."
      : feed?.content;
  return { title: `${feed?.user?.name}: "${feedContent}"` };
}

async function page({ params }: { params: Params }) {
  const feed = await GetFeedById(params.feedId);
  const comments = feed?.comments;
  return (
    <>
      {<EchoItem feed={feed} />}
      {<FeedList feeds={comments} />}
    </>
  );
}

export default page;
