import FeedList from "@/app/_components/FeedList";
import FollowBtn from "@/app/_components/FollowBtn";
import UserCard from "@/app/_components/UserCard";
import {
  AddFollow,
  getFans,
  getFeedByUsername,
  getFollow,
  getUserByName,
} from "@/app/_services/fetchDataAPI";

async function page({ params }) {
  const username = params.username;
  const [user, feeds, following, followers] = await Promise.all([
    getUserByName(username),
    getFeedByUsername(username),
    getFollow(username),
    getFans(username),
  ]);
  return (
    <>
      <UserCard user={user} />
      <h1>{following?.length}</h1>
      <h1>{followers?.length}</h1>
      {/* <FollowBtn username={username} /> */}
      <FeedList feeds={feeds} />
    </>
  );
}

export default page;
