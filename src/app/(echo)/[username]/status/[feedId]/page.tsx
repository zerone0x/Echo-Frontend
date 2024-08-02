import BackBtn from "@/app/_components/BackBtn";
import EchoItem from "@/app/_components/EchoItem";
import FeedDetail from "@/app/_components/FeedDetail";
import FeedList from "@/app/_components/FeedList";
import Spinner from "@/app/_components/Spinner";
import UserDetail from "@/app/_components/UserDetail";
import { ParamsProps } from "@/app/_config/type";
import {
  GetAllFeeds,
  getCommentsByFeedID,
  GetFeedById,
} from "@/app/_services/fetchDataAPI";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }: ParamsProps) {
  return { title: `${params.username} echoed ..` };
}

// auto generate title for each feed
// export async function generateMetadata({ params }: ParamsProps) {
//   const feed = await GetFeedById(params.feedId);
//   const feedContent =
//     feed && feed.content && feed.content.length > 30
//       ? feed.content.slice(30) + "..."
//       : feed?.content;
//   return { title: `${feed?.user?.name}: "${feedContent}"` };
// }

async function page({ params }: ParamsProps) {
  const feedId = params.feedId;
  return <FeedDetail feedId={feedId} />;
}

export default page;
