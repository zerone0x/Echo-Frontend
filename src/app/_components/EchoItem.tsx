import { FaBookmark, FaReply, FaStar } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";
import Image from "next/image";
import { FormatTime } from "@/app/_utils/FormatData";
import TextExpander from "./TextExpander";
import Link from "next/link";
import UserCard from "./UserCard";

function EchoItem({ feed }) {
  const user = feed?.user;
  const content = feed?.content;
  const createdAt = feed?.createdAt;
  const name = user?.name;
  const ProfileImage = user?.ProfileImage;

  const reactItem = [
    {
      name: "Like",
      icon: <FaStar />,
    },
    {
      name: "Repost",
      icon: <BiRepost />,
    },
    {
      name: "Favorite",
      icon: <FaStar />,
    },
    {
      name: "Bookmark",
      icon: <FaBookmark />,
    },
    {
      name: "More",
      icon: <IoIosMore />,
    },
  ];
  return (
    feed && (
      <Link href={`/${name}/status/${feed._id}`}>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:bg-gray-100">
          <div className="p-4 flex justify-between items-center">
            {ProfileImage && (
              <UserCard user={user} />
            )}
            <span className="text-sm text-gray-500">
              {FormatTime(createdAt)}
            </span>
          </div>
          <div className="px-4 py-2">
            <TextExpander>{content}</TextExpander>
          </div>
          <div className="px-4 py-2 flex space-x-2">
            {reactItem.map((item, index) => (
              <button
                key={index}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>
      </Link>
    )
  );
}

export default EchoItem;
