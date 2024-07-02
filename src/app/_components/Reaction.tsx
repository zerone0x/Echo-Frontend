import { useQueryClient } from "react-query";
import { useAuth } from "../_utils/getLogin";
import { FaBookmark, FaStar } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";
import { BookMarkFeed } from "../_services/fetchDataAPI";

function Reaction({ feedId }) {
  const { currentUserId } = useAuth();
  const queryClient = useQueryClient();

  async function bookmarkClick() {
    await BookMarkFeed(feedId, currentUserId);
    queryClient.invalidateQueries("bookmark");
  }

  const reactItems = [
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
      action: bookmarkClick,
    },
    {
      name: "More",
      icon: <IoIosMore />,
    },
  ];

  return (
    <div className="px-4 py-2 flex space-x-2 justify-start gap-10">
      {reactItems.map((item) => (
        <button
          key={item.name}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => item.action && item.action()} // TODO:check later
          aria-label={item.name}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}

export default Reaction;
