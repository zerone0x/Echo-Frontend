import Image from "next/image";
import Link from "next/link";

function UserAvator({
  name,
  ProfileImage,
  size = 16,
}: {
  name: string;
  ProfileImage: string;
  size?: number;
}) {
  return (
    <Link href={`/${name}`}>
      <div
        className={`z-3 relative h-${size} w-${size} cursor-pointer overflow-hidden rounded-full transition-all duration-300 hover:brightness-75`}
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
