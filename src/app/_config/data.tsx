import { FaHome, FaSearch, FaStar } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { IoChatbubblesOutline } from "react-icons/io5";

export const navLinks = [
  {
    name: "Home",
    href: "/home",
    icon: <FaHome />,
  },
  // {
  //   name: "Chat",
  //   href: "/chat",
  //   icon: <IoChatbubblesOutline />,
  // },
  {
    name: "Notification",
    href: "/notification",
    icon: <IoIosNotifications />,
  },
  {
    name: "Search",
    href: "/search",
    icon: <FaSearch />,
  },

  {
    name: "Bookmark",
    href: "/bookmark",
    icon: <FaBookmark />,
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

export const aboutEcho = `Overhead, the albatross
Hangs motionless upon the air
And deep beneath the rolling waves
In labyrinths of coral caves
The echo of a distant time
Comes willowing across the sand
And everything is green and submarine
`;
