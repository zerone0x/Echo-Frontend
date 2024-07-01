import Image from "next/image";
import Link from "next/link";

function UserCard({ ProfileImage, name }) {
  // const name = user?.name;
  // const ProfileImage = user?.ProfileImage;
  // console.log(user);
  console.log("#######", ProfileImage);

  return (
    <div className="flex items-center space-x-3">
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
      <span className="font-medium text-gray-700">{name}</span>
    </div>
  );
}

export default UserCard;
