import { FeedProps } from "../_config/type";
import EchoItem from "./EchoItem";

function FeedList({ feeds }: { feeds: FeedProps[] }) {
  return (
    <div>
      {feeds.length > 0 &&
        feeds.map((feed: object, index: number) => (
          <EchoItem feed={feed} key={feed._id} />
        ))}
    </div>
  );
}

export default FeedList;
