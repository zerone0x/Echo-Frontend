import Image from "next/image";
import Link from "next/link";
import FollowBtn from "./FollowBtn";

function UserCard({ user }) {
  const name = user?.name;
  const ProfileImage = user?.ProfileImage;
  // console.log(user);

  return (
    <div className="flex items-center space-x-3 hover:cursor-pointer hover:underline">
      {ProfileImage && (
        <Link href={`/${name}`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_ROOT_URL}${ProfileImage}`}
            alt="user profile"
            width={50}
            height={50}
            className="rounded-full"
          />
        </Link>
      )}
      <span className="font-medium text-gray-700 ">{name}</span>
    </div>
  );
}

export default UserCard;
