import { useQueryClient } from "react-query";
import { useAuth } from "../_utils/getLogin";
import { FaBookmark, FaStar } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";
import {
  BookMarkFeed,
  DeleteFeedById,
  LikeFeed,
} from "../_services/fetchDataAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reaction({ feedId }) {
  const { currentUserId } = useAuth();
  const queryClient = useQueryClient();

  async function bookmarkClick() {
    await BookMarkFeed(feedId, currentUserId);
    queryClient.invalidateQueries("bookmark");
    toast.success("Echo bookmarked successfully!");
  }

  async function likeClick() {
    await LikeFeed(feedId, currentUserId);
    queryClient.invalidateQueries("likes");
    toast.success("Echo liked successfully!");
  }
  async function delFeed() {
    await DeleteFeedById(feedId);
    // queryClient.invalidateQueries("feeds");
    // queryClient.invalidateQueries("bookmark");
    // queryClient.invalidateQueries("likes");
    queryClient.invalidateQueries({
      predicate: (query) =>
        ["feeds", "bookmark", "likes"].includes(query.queryKey[0]),
    });
    toast.success("Echo deleted successfully!");
  }

  const reactItems = [
    {
      name: "Repost",
      icon: <BiRepost />,
    },
    {
      name: "Favorite",
      icon: <FaStar />,
      action: likeClick,
    },
    {
      name: "Bookmark",
      icon: <FaBookmark />,
      action: bookmarkClick,
    },
    {
      name: "More",
      icon: <IoIosMore />,
      action: delFeed,
    },
  ];

  return (
    <div className="px-4 py-2 flex space-x-2 justify-start gap-10">
      <ToastContainer />
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
