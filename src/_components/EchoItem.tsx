import { FaBookmark, FaReply, FaStar } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";
import Image from "next/image";
import { FormatTime } from "@/_utils/FormatData";

// TODO format data into variable
// then map to display
function EchoItem({ feed }) {
  const BASE_URL = process.env.NEXT_PUBLIC_ROOT_URL;
  const name = feed?.user?.name;
  const content = feed?.content;
  const createdAt = feed?.createdAt;
  const ProfileImage = feed?.user?.ProfileImage
  return feed &&(
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src={`${BASE_URL}${ProfileImage}`}
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
        <button>
          <FaReply />
        </button>
        <button>
          <BiRepost />
        </button>
        <button>
          <FaStar />
        </button>
        <button>
          <FaBookmark />
        </button>
        <button>
          <IoIosMore />
        </button>
      </div>
    </div>
  );
}

export default EchoItem;
