"use client";
import Picker from "emoji-picker-react";
import { useState } from "react";
import { MdEmojiEmotions } from "react-icons/md";
import { GoPaperclip } from "react-icons/go";
import { useAuth } from "../_utils/getLogin";
import Image from "next/image";
import { CreateFeed } from "../_services/fetchDataAPI";
import UserCard from "./UserCard";

async function Publish() {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [content, setContent] = useState("");
  const [showPick, setShowPick] = useState(false);
  const { authData, setAuthData } = useAuth();
  const username = authData?.name;
  const ProfileImage = authData?.ProfileImage;
  const userId = authData?.userId;
  // const AppendEmoji = (event, emojiObject) => {
  //   const newText = content + event.emoji;
  //   setContent(newText);
  //   setValue("content", newText);
  // };
  function handleSubmit(e) {
    e.preventDefault();
    CreateFeed(content, userId);
  }

  const togglePicker = () => {
    setShowPick(!showPick);
  };
  return (
    <div>
      <UserCard user={authData} />
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
        <input
          className="w-full h-10"
          // {...register("content", { required: "This field is required" })}
          type="text"
          name="content"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* <div className="flex flex-row">
          <button onClick={togglePicker}>
            <MdEmojiEmotions />
          </button>
          <button>
            <GoPaperclip />
          </button>
        </div>
        {showPick && <Picker onEmojiClick={AppendEmoji} />} */}
        <button type="submit" className="">
          Echo!
        </button>
      </form>
    </div>
  );
}

export default Publish;
