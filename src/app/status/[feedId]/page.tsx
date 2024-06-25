import EchoItem from "@/_components/EchoItem";
import { GetAllFeeds, GetFeedById } from "@/_services/fetchDataAPI";
import { Metadata } from "next";

export async function generateMetadata({ params }) {
  const feed = await GetFeedById(params.feedId);
  const feedContent =
    feed && feed.content && feed.content.length > 30
      ? feed.content.slice(30) + "..."
      : feed?.content;
  return { title: `${feed?.user?.name}: "${feedContent}"` };
}

export async function generateStaticParams() {
  const feeds = await GetAllFeeds();
  const paths = feeds.map((feed) => ({
    params: { feedId: String(feed.id) },
  }));
  return paths;
}

async function page({ params }) {
  console.log(params.feedId);
  const feed = await GetFeedById(params.feedId);
  return (
    feed && (
      <>
        <h3>Post</h3>
        <button>Back</button>
        <EchoItem feed={feed} />
      </>
    )
  );
}

export default page;
