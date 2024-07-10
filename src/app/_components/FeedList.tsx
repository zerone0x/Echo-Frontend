import EchoItem from "./EchoItem";

function FeedList({ feeds }) {
  return (
    <div>
      {feeds.length &&
        feeds.map((feed: object, index: number) => (
          <EchoItem feed={feed} key={feed._id} />
        ))}
    </div>
  );
}

export default FeedList;
