import { GetAllFeeds } from "@/_services/fetchDataAPI";
import FeedList from "./FeedList";

async function AllFeedsList() {
  const feeds = await GetAllFeeds();
  if (!feeds.length) return null;
  return <FeedList feeds={feeds} />;
}

export default AllFeedsList;
