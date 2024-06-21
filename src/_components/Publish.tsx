"use client";
import { useForm } from "react-hook-form";
import Picker from "emoji-picker-react";
import { useState } from "react";
import { MdEmojiEmotions } from "react-icons/md";
import { GoPaperclip } from "react-icons/go";

function Publish() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [content, setContent] = useState("");
  const [showPick, setShowPick] = useState(false);

  const AppendEmoji = (event, emojiObject) => {
    const newText = content + event.emoji;
    setContent(newText);
    setValue("content", newText);
  };

  const onSubmit = (data) => {
    console.log(data);
    // 如果有 API 调用，可以在这里添加
    // CreateFeed(data).then(...)
  };
  const togglePicker = () => {
    setShowPick(!showPick);
  };
  return (
    <div>
      <span>USERName</span>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          className="w-full h-10"
          {...register("content", { required: "This field is required" })}
          type="text"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setValue("content", e.target.value, { shouldValidate: true });
          }}
        />
        <div className="flex flex-row">
          <button onClick={togglePicker}>
            <MdEmojiEmotions />
          </button>
          <button>
            <GoPaperclip />
          </button>
        </div>
        {showPick && <Picker onEmojiClick={AppendEmoji} />}
        {errors.content && <span>{errors.content.message}</span>}
        <button type="submit" className="">
          Echo!
        </button>
      </form>
    </div>
  );
}

export default Publish;
