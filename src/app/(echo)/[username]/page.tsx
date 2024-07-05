import BackBtn from "@/app/_components/BackBtn";
import Content from "@/app/_components/Content";
import FeedList from "@/app/_components/FeedList";
import FollowBtn from "@/app/_components/FollowBtn";
import FollowDetail from "@/app/_components/FollowDetail";
import UserCard from "@/app/_components/UserCard";
import { getFeedByUsername, getUserByName } from "@/app/_services/fetchDataAPI";
import { useAuth } from "@/app/_utils/getLogin";
import Image from "next/image";

async function page({ params }) {
  const username = params.username;
  const [user, feeds] = await Promise.all([
    getUserByName(username),
    getFeedByUsername(username),
  ]);

  const feedLen = feeds?.length;

  return (
    <div>
      <header className="fixed top-0 w-full md:w-3/5 lg:w-4/6 bg-blue-500 text-white p-4 z-10">
        <BackBtn />
      </header>
      <Content>
        <div className="w-full">
          {/* Banner Image */}
          <Image
            src={`${process.env.NEXT_PUBLIC_ROOT_URL}${user.Banner}`}
            alt="User Banner"
            layout="responsive"
            width={700} // Aspect ratio width
            height={250} // Aspect ratio height, adjust these to control the aspect ratio
            className="object-cover w-full" // Cover will ensure the image covers the area without distorting aspect ratio
          />
        </div>
        <div className="flex flex-row items-center gap-4 p-4">
          {/* UserCard and Follow Button placed below the banner image */}
          <UserCard user={user} />
          <FollowBtn username={username} />
        </div>
        <div>
          <FollowDetail username={username} feedLen={feedLen} />
          <FeedList feeds={feeds} />
        </div>
      </Content>
    </div>
  );
}

export default page;
