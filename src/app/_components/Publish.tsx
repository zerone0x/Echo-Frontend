"use client";
import { useState } from "react";
import { MdEmojiEmotions } from "react-icons/md";
import { GoPaperclip } from "react-icons/go";
import { useAuth } from "../_utils/getLogin";
import { CreateFeed } from "../_services/fetchDataAPI";
import UserCard from "./UserCard";
import EmojiPicker from "./EmojiPicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQueryClient } from "react-query";
import { useEffect, useRef } from "react";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";

function Publish() {
  const [content, setContent] = useState("");
  const [showPick, setShowPick] = useState(false);
  const { authData } = useAuth();
  const queryClient = useQueryClient();
  const emojiPickerRef = useRef(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = authData?.userId;
    await CreateFeed(content, userId);
    queryClient.invalidateQueries("feeds");
    setContent("");
    setShowPick(false);
    router.push("/home");
  };

  const togglePicker = () => {
    setShowPick(!showPick);
  };

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowPick(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiPickerRef]);

  return (
    <div>
      <ToastContainer />
      <UserCard user={authData} />
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-4">
        <textarea
          className="w-full h-16 px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={4}
        />
        <div className="flex flex-row space-x-2 mt-3">
          <button
            type="button"
            onClick={togglePicker}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full"
          >
            <MdEmojiEmotions />
          </button>
          <button
            type="button"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-full"
          >
            <GoPaperclip />
          </button>
        </div>
        {showPick && (
          <div ref={emojiPickerRef}>
            <EmojiPicker content={content} setContent={setContent} />
          </div>
        )}
        <SubmitButton pendingLabel="Posting...">Echo!</SubmitButton>
      </form>
    </div>
  );
}

export default Publish;
