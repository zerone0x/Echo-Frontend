import Image from "next/image";
import Link from "next/link";
import { FaHome, FaStar } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoBookmarkSharp, IoEarth } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
// https://react-icons.github.io/react-icons/search/#q=

const navLinks = [
  {
    name: "Home",
    href: "/home",
    icon: <FaHome />,
  },
  {
    name: "Notifications",
    href: "/notification",
    icon: <IoIosNotifications />,
  },
  {
    name: "Live feeds",
    href: "/public",
    icon: <IoEarth />,
  },
  {
    name: "Bookmarks",
    href: "/bookmark",
    icon: <IoBookmarkSharp />,
  },
  {
    name: "Favorites",
    href: "/favourites",
    icon: <FaStar />,
  },
  {
    name: "Preferences",
    href: "/about",
    icon: <BsThreeDots />,
  },
];
function Sidebar() {
  return (
    <nav className="text-4xl flex flex-col">
      <ul>
        <li>
          <Image src="/echo.png" alt="Echo Logo" width={70} height={70} />
        </li>
        {navLinks.map((link, index) => (
          <li>
            <Link href={link.href} key={index}>
              <div className="flex items-center">
                {link.icon}
                <span>{link.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
