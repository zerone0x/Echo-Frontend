import Image from "next/image";
import Link from "next/link";
import FollowBtn from "./FollowBtn";

function UserCard({ user, isBtnDisplay = true }) {
  const name = user?.name;
  const username = user?.username;
  const ProfileImage = user?.ProfileImage;

  return (
    <>
      <div className="flex items-center space-x-3 hover:cursor-pointer hover:underline">
        {ProfileImage && (
          <Link href={`/${name}`}>
            <Image
              src={ProfileImage}
              alt="user profile"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>
        )}
        <div className="flex flex-col">
          <span className="font-medium text-gray-700">{username}</span>
          <span className="font-medium text-gray-700">@{name}</span>
        </div>
      </div>
      {isBtnDisplay && <FollowBtn username={name} />}
    </>
  );
}

export default UserCard;
