"use client";
import { useQueryClient } from "react-query";
import { useAuth } from "../_utils/getLogin";
import { FaBookmark, FaStar } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import {
  BookMarkFeed,
  DeleteFeedById,
  GetCountOfLikes,
  LikeFeed,
  deleteCommentById,
  getIsBooked,
  getIsLiked,
} from "../_services/fetchDataAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { useRouter } from "next/navigation";
import { usePublishType } from "../_utils/getPublishType";
import { CommentProps, FeedProps, UserProps } from "../_config/type";
import { FaReply, FaRetweet } from "react-icons/fa6";
import { usePathname } from "next/navigation";

function Reaction({
  feed,
  type,
  commentsCount,
  user,
}: {
  feed: FeedProps | CommentProps;
  type: string;
  commentsCount: number;
  user: UserProps;
}) {
  const feedId = feed?._id;
  const { currentUserId } = useAuth();
  const isDeletable = user.role === "admin" || currentUserId === user?._id;
  const queryClient = useQueryClient();
  const [likeStatus, setLikeStatus] = useState(false);
  const [likedCount, setLikedCount] = useState(0);
  const [commentCount, setCommentCount] = useState(commentsCount);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);
  const [dialog, setDialog] = useState({ isOpen: false, feedId: feedId });
  const [dotsDialog, setDotsDialog] = useState(false);
  const dialogRef = useRef(null);
  const router = useRouter();
  const { publishType, setPublishType } = usePublishType();
  const pathname = usePathname();

  // NOTE: We need to close dialog when click outside the dropdown

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dialogRef.current &&
        // @ts-ignore
        !dialogRef.current.contains(event.target as Node)
      ) {
        setDotsDialog(false);
      }
    }

    if (dotsDialog) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dotsDialog]);

  useEffect(() => {
    async function fetchStatuses() {
      const liked = await getIsLiked(feedId, type);
      const bookmarked = await getIsBooked(feedId, type);
      const likeCount = await GetCountOfLikes(feedId, type);
      setLikedCount(likeCount);
      setLikeStatus(liked);
      setBookmarkStatus(bookmarked);
    }
    fetchStatuses();
  }, [feedId]);

  async function bookmarkClick(event: any) {
    // event.stopPropagation();
    event.preventDefault();
    setBookmarkStatus((bookmarkStatus) => !bookmarkStatus);
    setDotsDialog(false);
    await BookMarkFeed(feedId, type);
    queryClient.invalidateQueries("bookmark");
  }

  async function likeClick(event: any) {
    event.stopPropagation();
    event.preventDefault();
    setLikeStatus((likeStatus) => !likeStatus);
    setLikedCount(likeStatus ? likedCount - 1 : likedCount + 1);
    setDotsDialog(false);
    await LikeFeed(feedId, type);
    queryClient.invalidateQueries("likes");
  }

  async function ReplyClick(event: any) {
    event.stopPropagation();
    event.preventDefault();
    // setReplyDialog(true)
    setPublishType({ type: "Comment", feed: feed });
    router.push("/publish");
  }

  function handleDelDialog(event: any) {
    event.stopPropagation();
    event.preventDefault();
    setDotsDialog(false);
    setDialog({ isOpen: true, feedId: feedId });
  }

  function handleThreeDotsDialog(event: any) {
    event.stopPropagation();
    event.preventDefault();
    setDotsDialog(!dotsDialog);
  }

  async function delFeed() {
    if (type === "Feed") {
      await DeleteFeedById(dialog.feedId);
      if (pathname !== "/home") {
        router.push(`/home`);
      }
    }
    if (type === "Comment") {
      await deleteCommentById(dialog.feedId);
      router.refresh();
    }
    queryClient.invalidateQueries("feeds");
    queryClient.invalidateQueries("bookmark");
    queryClient.invalidateQueries("likes");
    queryClient.invalidateQueries({
      predicate: (query) =>
        // @ts-ignore
        ["feeds", "bookmark", "likes"].includes(query.queryKey[0]),
    });
    setDialog({ isOpen: false, feedId: dialog.feedId });
  }

  const reactItems = [
    {
      name: "Reply",
      icon: <FaReply className="h-5 w-5" />,
      number: commentCount,
      settings: false,
      action: ReplyClick,
      disabled: type === "Comment" ? true : false,
    },
    {
      name: "Repost",
      icon: <FaRetweet className="h-5 w-5" />,
      color: "text-gray-500",
      settings: false,
      disabled: true,
    },
    {
      name: "Favorite",
      icon: <FaStar className="h-5 w-5" />,
      action: likeClick,
      color: likeStatus ? "text-yellow-500" : "text-gray-500",
      number: likedCount,
      settings: true,
      disabled: false,
    },
    {
      name: "Bookmark",
      icon: <FaBookmark className="h-5 w-5" />,
      action: bookmarkClick,
      color: bookmarkStatus ? "text-red-500" : "text-gray-500",
      settings: true,
      disabled: false,
    },
    {
      name: "Others",
      icon: dotsDialog ? (
        <IoIosClose className="h-5 w-5" />
      ) : (
        <IoIosMore className="h-5 w-5" />
      ),
      action: handleThreeDotsDialog,
      settings: false,
      disabled: false,
    },
  ];

  return (
    <div className="flex w-full items-center justify-evenly gap-10 space-x-2 px-4 py-2 text-xl">
      {/* <ToastContainer /> */}
      {reactItems.map((item) => (
        <div className="relative" key={item.name}>
          <div className="flex min-h-4 min-w-9 items-center space-x-1">
            <button
              className={`${item.color} hover:bg-slate-200 focus:outline-none`}
              onClick={(e) => item.action && item.action(e)}
              aria-label={item.name}
              disabled={item.disabled}
            >
              {item.icon}
            </button>
            <span>{item?.number && item?.number > 0 ? item.number : " "}</span>
          </div>

          {dotsDialog && item.name === "Others" && (
            <dialog
              ref={dialogRef}
              className="absolute right-0 z-50 mt-1 flex flex-col gap-1 border border-gray-300 bg-white p-2"
            >
              {reactItems
                .filter((item) => item.settings !== false)
                .map((dotBtn, index) => {
                  return (
                    <button
                      key={index}
                      className="text-left"
                      onClick={dotBtn.action}
                    >
                      {dotBtn.name}
                    </button>
                  );
                })}
              {/* TODO add copy link */}
              {/* <button className="text-left text-red-500 hover:bg-gray-400">
                Copy Link
              </button> */}
              {isDeletable && (
                <button
                  className="text-left text-red-500 hover:bg-gray-400"
                  onClick={(e) => handleDelDialog(e)}
                >
                  Delete
                </button>
              )}
            </dialog>
          )}
        </div>
      ))}
      {dialog.isOpen && dialog.feedId === feedId && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setDialog({ isOpen: false, feedId: dialog.feedId })}
          ></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="mx-auto w-full max-w-full rounded-lg p-5 sm:max-w-lg">
              <ConfirmDialog
                dialog={dialog}
                setDialog={setDialog}
                dialogAction={delFeed}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Reaction;
