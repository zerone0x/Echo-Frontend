import EchoItem from "@/_components/EchoItem";
import { GetFeedById } from "@/_services/fetchDataAPI";

async function page({ params }) {
  const feed = await GetFeedById(params.feedId);
  return <EchoItem feed={feed} />;
}

export default page;
