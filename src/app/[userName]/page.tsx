import EchoItem from "@/_components/EchoItem";
import { GetFeedById } from "@/_services/fetchDataAPI";

async function page({ params }) {
  console.log(params.username);
  const feed = await GetFeedById(params.username);
  return <EchoItem feed={feed} />;
}

export default page;
