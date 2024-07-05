"use client";
import { useQueryClient } from "react-query";
import { useAuth } from "../_utils/getLogin";
import { FaBookmark, FaStar } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { LuReply } from "react-icons/lu";
import {
  BookMarkFeed,
  DeleteFeedById,
  LikeFeed,
  getIsBooked,
  getIsLiked,
} from "../_services/fetchDataAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function Reaction({ feedId }) {
  const { currentUserId } = useAuth();
  const queryClient = useQueryClient();
  const [likeStatus, setLikeStatus] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);

  useEffect(() => {
    async function fetchStatuses() {
      const liked = await getIsLiked(feedId);
      const bookmarked = await getIsBooked(feedId);
      setLikeStatus(liked);
      setBookmarkStatus(bookmarked);
    }
    fetchStatuses();
  }, [feedId]);

  async function bookmarkClick(event) {
    // event.stopPropagation();
    event.preventDefault();
    setBookmarkStatus((bookmarkStatus) => !bookmarkStatus);
    await BookMarkFeed(feedId, currentUserId);
    queryClient.invalidateQueries("bookmark");
    // toast.success("Echo bookmarked successfully!");
  }

  async function likeClick(event) {
    event.stopPropagation();
    event.preventDefault();
    setLikeStatus((likeStatus) => !likeStatus);
    await LikeFeed(feedId, currentUserId);
    queryClient.invalidateQueries("likes");
    toast.success("Echo liked successfully!");
  }
  async function delFeed(event) {
    event.stopPropagation();
    event.preventDefault();
    await DeleteFeedById(feedId);
    queryClient.invalidateQueries("feeds");
    queryClient.invalidateQueries("bookmark");
    queryClient.invalidateQueries("likes");
    queryClient.invalidateQueries({
      predicate: (query) =>
        ["feeds", "bookmark", "likes"].includes(query.queryKey[0]),
    });
    // toast.success("Echo deleted successfully!");
  }

  const reactItems = [
    {
      name: "Reply",
      icon: <LuReply />,
      color: "text-green-500",
    },
    {
      name: "Repost",
      icon: <BiRepost />,
      color: "text-green-500",
    },
    {
      name: "Favorite",
      icon: <FaStar />,
      action: likeClick,
      color: likeStatus ? "text-yellow-500" : "text-gray-500",
    },
    {
      name: "Bookmark",
      icon: <FaBookmark />,
      action: bookmarkClick,
      color: bookmarkStatus ? "text-red-500" : "text-gray-500",
    },
    {
      name: "Delete",
      icon: <IoIosClose />,
      action: delFeed,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="px-4 py-2 flex space-x-2 justify-start gap-10">
      <ToastContainer />
      {reactItems.map((item) => (
        <button
          key={item.name}
          className={`text-gray-500 hover:text-gray-700 focus:outline-none`}
          onClick={(e) => item.action && item.action(e)} // TODO:check later
          aria-label={item.name}
        >
          <span className={item.color}>{item.icon}</span>
          {/* {item.icon} */}
        </button>
      ))}
    </div>
  );
}

export default Reaction;
