import EchoItem from "./EchoItem";

function FeedList({ feeds }) {
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
