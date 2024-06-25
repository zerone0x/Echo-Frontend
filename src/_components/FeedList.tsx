import { GetAllFeeds } from "@/_services/fetchDataAPI";
import EchoItem from "./EchoItem";

async function FeedList() {
  const feeds = await GetAllFeeds();
  if (!feeds.length) return null;
  return (
    <div>
      {feeds &&
        feeds.map((feed: object, index: number) => (
          <EchoItem feed={feed} key={index} />
        ))}
    </div>
  );
}

export default FeedList;
