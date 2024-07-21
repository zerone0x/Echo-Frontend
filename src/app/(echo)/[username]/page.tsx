import FeedList from "@/app/_components/FeedList";
import UserDetail from "@/app/_components/UserDetail";
import { ParamsProps } from "@/app/_config/type";
import { getFeedByUsername } from "@/app/_services/fetchDataAPI";

export async function generateMetadata({ params }: ParamsProps) {
  return { title: `${params.username}` };
}

async function page({ params }: ParamsProps) {
  const username = params.username;
  const feeds = await getFeedByUsername(username);

  return (
    <div>
      <UserDetail username={username} />
      <FeedList feeds={feeds} />
    </div>
  );
}

export default page;
