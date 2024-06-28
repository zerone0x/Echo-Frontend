"use client";
import Image from "next/image";
import Link from "next/link";
import { FaHome, FaStar } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoBookmarkSharp, IoEarth } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import logo from "../../../public/logo.png";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <nav className="text-4xl flex flex-col">
      <ul>
        <li>
          <Image
            src={logo}
            quality={100}
            alt="The Echo App Logo"
            width={70}
            height={70}
          />
        </li>
        {navLinks.map((link, index) => (
          <li key={`${link.name}-${index}`}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                pathname === link.href ? "bg-primary-900" : ""
              }`}
              href={link.href}
            >
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
