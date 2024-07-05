import BackBtn from "@/app/_components/BackBtn";
import Content from "@/app/_components/Content";
import EchoItem from "@/app/_components/EchoItem";
import Spinner from "@/app/_components/Spinner";
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
  const feed = await GetFeedById(params.feedId);
  return (
    <>
      <BackBtn />

      {feed && (
        <Suspense fallback={<Spinner />}>
          <EchoItem feed={feed} />
        </Suspense>
      )}
    </>
  );
}

export default page;
