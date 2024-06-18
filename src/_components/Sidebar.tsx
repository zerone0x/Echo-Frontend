import Image from "next/image";
import Link from "next/link";
import { FaHome, FaStar } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoBookmarkSharp, IoEarth } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
// https://react-icons.github.io/react-icons/search/#q=

function Sidebar() {
  return (
    <div className="text-4xl flex flex-col">
      <Image src="/echo.png" alt="Echo Logo" width={70} height={70} />
      <Link href="/home" className="flex">
        <FaHome />
        Home
      </Link>
      <Link href="/notification" className="flex">
        <IoIosNotifications />
        Notifications
      </Link>
      <Link href="/public" className="flex">
        <IoEarth />
        Live feeds
      </Link>
      <Link href="/bookmark" className="flex">
        <IoBookmarkSharp />
        Bookmarks
      </Link>
      <Link href="/favourites" className="flex">
        <FaStar />
        Favorites
      </Link>
      <Link href="/about" className="flex">
        <BsThreeDots />
        Preferences
      </Link>
    </div>
  );
}

export default Sidebar;
