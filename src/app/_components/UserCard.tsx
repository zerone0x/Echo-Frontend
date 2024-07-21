import Image from "next/image";
import Link from "next/link";
import FollowBtn from "./FollowBtn";
import { UserProps } from "../_config/type";

interface UserCardProps {
  user: UserProps;
  isBtnDisplay?: boolean;
}

function UserCard({ user, isBtnDisplay = true }: UserCardProps) {
  const { name, username, ProfileImage } = user;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3 hover:cursor-pointer">
        <Link href={`/${name}`}>
          <div className="z-3 relative h-16 w-16 cursor-pointer overflow-hidden rounded-full transition-all duration-300 hover:brightness-75">
            <Image
              src={ProfileImage}
              alt="Avatar"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Link>
        <div className="flex flex-col">
          <span className="block text-lg font-medium text-black hover:underline">
            {username}
          </span>
          <span className="block font-medium text-gray-700">@{name}</span>
        </div>
      </div>
      {isBtnDisplay && <FollowBtn username={name} />}
    </div>
  );
}

export default UserCard;
