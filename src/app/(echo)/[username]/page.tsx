import FeedList from "@/app/_components/FeedList";
import { getFeedByUsername, getUserByName } from "@/app/_services/fetchDataAPI";

async function page({ params }) {
  const [user, feeds] = await Promise.all([
    getUserByName(params.username),
    getFeedByUsername(params.username),
  ]);
  return (
    <>
      <FeedList feeds={feeds} />
    </>
  );
}

export default page;
