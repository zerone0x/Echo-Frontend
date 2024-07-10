import { Suspense } from "react";
import { getFeedByUsername, getUserByName } from "../_services/fetchDataAPI";
import BackBtn from "./BackBtn";
import Image from "next/image";
import UserCard from "./UserCard";
import FollowBtn from "./FollowBtn";
import FollowDetail from "./FollowDetail";
import Loading from "../loading";

async function UserDetail({ username }) {
  const [user, feeds] = await Promise.all([
    getUserByName(username),
    getFeedByUsername(username),
  ]);
  const feedLen = feeds?.length;
  return (
    <>
      <BackBtn />
      <Suspense fallback={<Loading />}>
        <div className="w-full">
          {/* Banner Image */}
          <Image
            src={`${process.env.NEXT_PUBLIC_ROOT_URL}${user.Banner}`}
            alt="User Banner"
            layout="responsive"
            width={700} // Aspect ratio width
            height={250} // Aspect ratio height, adjust these to control the aspect ratio
            className="w-full object-cover" // Cover will ensure the image covers the area without distorting aspect ratio
          />
        </div>
        <div className="flex flex-row items-center gap-4 p-4">
          <UserCard user={user} />
        </div>

        <FollowDetail username={username} feedLen={feedLen} />
      </Suspense>
    </>
  );
}

export default UserDetail;
