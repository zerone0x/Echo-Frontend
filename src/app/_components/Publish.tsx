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
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function Publish() {
  const [content, setContent] = useState("");
  const [showPick, setShowPick] = useState(false);
  const [files, setFiles] = useState([]);
  const { authData } = useAuth();
  const queryClient = useQueryClient();
  const emojiPickerRef = useRef(null);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("image", file); // 使用 'image' 作为键，添加每个文件
    });
    formData.append("content", content);
    console.log(files);
    console.log(formData);

    await CreateFeed(formData);
    queryClient.invalidateQueries("feeds");
    setContent("");
    setFiles([]);
    setShowPick(false);
    router.push("/home");
  };

  const togglePicker = () => {
    setShowPick(!showPick);
  };

  function handleKeyDown(e: any) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
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
      <UserCard user={authData} isBtnDisplay={false} />
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-4">
        <textarea
          className="h-16 w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:border-blue-500 focus:outline-none"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={4}
          required
        />
        <div className="mt-3 flex flex-col gap-6 space-y-2">
          <button
            type="button"
            onClick={togglePicker}
            className="rounded-full p-2 text-gray-700 hover:bg-gray-200"
          >
            <MdEmojiEmotions />
          </button>
          <FilePond
            files={files}
            allowReorder={true}
            allowMultiple={true}
            onupdatefiles={(fileItems) => {
              setFiles(fileItems.map((fileItem) => fileItem.file));
            }}
            labelIdle={`Drag & Drop your files or <span class="filepond--label-action"> Browse </span>`}
          />
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
