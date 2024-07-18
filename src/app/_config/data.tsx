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

export const dropdownOptions = [
  { value: "delete", label: "Delete" },
  { value: "bookmark", label: "Bookmark" },
  { value: "Follow @", label: "Follow @" },
];

export const aboutEcho = `Overhead, the albatross
Hangs motionless upon the air
And deep beneath the rolling waves
In labyrinths of coral caves
The echo of a distant time
Comes willowing across the sand
And everything is green and submarine
`;
