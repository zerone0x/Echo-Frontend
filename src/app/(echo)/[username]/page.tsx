import FeedList from "@/app/_components/FeedList";
import FollowBtn from "@/app/_components/FollowBtn";
import FollowDetail from "@/app/_components/FollowDetail";
import UserCard from "@/app/_components/UserCard";
import { getFeedByUsername, getUserByName } from "@/app/_services/fetchDataAPI";

async function page({ params }) {
  const username = params.username;
  const [user, feeds] = await Promise.all([
    getUserByName(username),
    getFeedByUsername(username),
  ]);
  const feedLen = feeds?.length;

  return (
    <div>
      <UserCard user={user} />
      <FollowDetail username={username} feedLen={feedLen} />
      <FollowBtn username={username} />
      <FeedList feeds={feeds} />
    </div>
  );
}

export default page;
