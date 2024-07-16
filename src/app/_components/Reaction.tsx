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
import ConfirmDialog from "./ConfirmDialog";

function Reaction({
  feedId,
  type,
  likesCount,
  commentsCount,
}: {
  feedId: string;
  type: string;
  likesCount: number;
  commentsCount: number;
}) {
  const { currentUserId } = useAuth();
  const queryClient = useQueryClient();
  const [likeStatus, setLikeStatus] = useState(false);
  const [likedCount, setLikedCount] = useState(likesCount);
  const [commentCount, setCommentCount] = useState(commentsCount);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);
  const [dialog, setDialog] = useState({ isOpen: false, feedId: feedId });

  useEffect(() => {
    async function fetchStatuses() {
      const liked = await getIsLiked(feedId, type);
      const bookmarked = await getIsBooked(feedId, type);
      setLikeStatus(liked);
      setBookmarkStatus(bookmarked);
    }
    fetchStatuses();
  }, [feedId]);

  async function bookmarkClick(event: any) {
    // event.stopPropagation();
    event.preventDefault();
    setBookmarkStatus((bookmarkStatus) => !bookmarkStatus);
    await BookMarkFeed(feedId, type);
    queryClient.invalidateQueries("bookmark");
    // toast.success("Echo bookmarked successfully!");
  }

  async function likeClick(event: any) {
    event.stopPropagation();
    event.preventDefault();
    setLikeStatus((likeStatus) => !likeStatus);
    setLikedCount(likeStatus ? likedCount - 1 : likedCount + 1);
    await LikeFeed(feedId, type);
    queryClient.invalidateQueries("likes");
    toast.success("Echo liked successfully!");
  }

  function handleDelDialog(event: any) {
    event.stopPropagation();
    event.preventDefault();
    setDialog({ isOpen: true, feedId: feedId });
  }

  async function delFeed() {
    await DeleteFeedById(dialog.feedId);
    queryClient.invalidateQueries("feeds");
    queryClient.invalidateQueries("bookmark");
    queryClient.invalidateQueries("likes");
    queryClient.invalidateQueries({
      predicate: (query) =>
        ["feeds", "bookmark", "likes"].includes(query.queryKey[0]),
    });
    setDialog({ isOpen: false, feedId: dialog.feedId });
  }

  const reactItems = [
    {
      name: "Reply",
      icon: <LuReply />,
      color: "text-green-500",
      number: commentCount,
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
      number: likedCount,
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
      action: handleDelDialog,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="flex justify-evenly gap-10 space-x-2 px-4 py-2 text-xl w-full">
      {/* <ToastContainer /> */}
      {reactItems.map((item) => (
        <button
          key={item.name}
          className={`text-gray-500 hover:text-gray-700 focus:outline-none `}
          onClick={(e) => item.action && item.action(e)} // TODO:check later
          aria-label={item.name}
        >
          <span className={`${item.color} flex items-center gap-1 text-xl `}>
            {item.icon} {item?.number && item?.number > 0 ? item?.number : ""}
          </span>
        </button>
      ))}
      {dialog.isOpen && dialog.feedId === feedId && (
        <ConfirmDialog
          dialog={dialog}
          setDialog={setDialog}
          dialogAction={delFeed}
        />
      )}
    </div>
  );
}

export default Reaction;
