import { Suspense } from "react";
import { getFeedByUsername, getUserByName } from "../_services/fetchDataAPI";
import BackBtn from "./BackBtn";
import Image from "next/image";
import UserCard from "./UserCard";
import FollowDetail from "./FollowDetail";
import Loading from "../loading";

async function UserDetail({ username }: { username: string }) {
  // TODO change to react query for triger after updating
  const [user, feeds] = await Promise.all([
    getUserByName(username),
    getFeedByUsername(username),
  ]);
  const feedLen = feeds?.length;
  return (
    <>
      <BackBtn />
      <Suspense fallback={<Loading />}>
        <div className="h-screen-10 w-full overflow-hidden">
          <Image
            src={user.Banner}
            alt={`${username} Banner`}
            layout="responsive"
            width={100}
            height={10}
            objectFit="cover"
            className="imageFullHeight"
          />
        </div>
        <div className="p-4">
          <UserCard user={user} />
        </div>
        <span className="p-4 font-medium text-gray-700">{user?.Bio}</span>
        <FollowDetail username={username} feedLen={feedLen} />
      </Suspense>
    </>
  );
}

export default UserDetail;
