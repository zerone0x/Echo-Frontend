import { FaHome, FaStar } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoBookmarkSharp } from "react-icons/io5";

export const navLinks = [
  {
    name: "Home",
    href: "/home",
    icon: <FaHome />,
  },
  {
    name: "Notification",
    href: "/notification",
    icon: <IoIosNotifications />,
  },
  // {
  //   name: "Live feeds",
  //   href: "/public",
  //   icon: <IoEarth />,
  // },
  {
    name: "Bookmark",
    href: "/bookmark",
    icon: <IoBookmarkSharp />,
  },
  {
    name: "Favorites",
    href: "/favourites",
    icon: <FaStar />,
  },
  // {
  //   name: "Preferences",
  //   href: "/about",
  //   icon: <BsThreeDots />,
  // },
];
