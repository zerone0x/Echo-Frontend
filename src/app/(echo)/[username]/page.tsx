import BackBtn from "@/app/_components/BackBtn";
import Content from "@/app/_components/Content";
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
      <header className="fixed top-0 w-4/6 md:w-3/5 lg:w-4/6 bg-blue-500 text-white p-4 z-10  ">
        <BackBtn />
      </header>
      <Content>
        <div className="flex flex-row  items-center gap-4">
          <UserCard user={user} />
          <FollowBtn username={username} />
        </div>
        <FollowDetail username={username} feedLen={feedLen} />

        <FeedList feeds={feeds} />
      </Content>
    </div>
  );
}

export default page;
