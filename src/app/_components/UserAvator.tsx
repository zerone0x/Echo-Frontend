import Image from "next/image";
import Link from "next/link";
import { UserProps } from "../_config/type";

function UserAvator({ user }: { user: UserProps }) {
  const ProfileImage = user?.ProfileImage;
  const name = user?.name;
  return (
    <Link href={`/user/${name}`}>
      <div
        className={`z-3 relative cursor-pointer overflow-hidden rounded-full transition-all duration-300 hover:brightness-75 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-16 lg:w-16`}
      >
        <Image
          src={ProfileImage}
          alt="Avatar"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </Link>
  );
}

export default UserAvator;
