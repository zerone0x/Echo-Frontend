import { FaBookmark, FaReply, FaStar } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";
import Image from "next/image";
import { FormatTime } from "@/_utils/FormatData";

function EchoItem({ feed }) {
  const name = feed?.user?.name;
  const content = feed?.content;
  const createdAt = feed?.createdAt;
  const ProfileImage = feed?.user?.ProfileImage;
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
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_ROOT_URL}${ProfileImage}`}
              alt="user profile"
              width={50}
              height={50}
            />
            <span>{name}</span>
          </div>
          <span>{FormatTime(createdAt)}</span>
        </div>
        <span>{content}</span>
        <div>
          {reactItem.map((item, index) => (
            <button key={index}> {item.icon} </button>
          ))}
        </div>
      </div>
    )
  );
}

export default EchoItem;
