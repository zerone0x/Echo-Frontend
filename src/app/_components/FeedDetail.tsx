"use client";
import { GetFeedById } from "../_services/fetchDataAPI";
import EchoItem from "./EchoItem";
import FeedList from "./FeedList";

async function FeedDetail({ feedId }: { feedId: string }) {
  // TODO change to react query
  const feed = await GetFeedById(feedId);
  const comments = feed?.comments;
  return (
    <>
      <EchoItem feed={feed} />
      <div className="p-4">
        <div className="border-l-2">
          <FeedList feeds={comments} />
        </div>
      </div>
    </>
  );
}

export default FeedDetail;
