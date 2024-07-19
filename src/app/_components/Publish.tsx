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
import { usePublishType } from "../_utils/getPublishType";
import EchoContent from "./EchoContent";

// Register the plugins
registerPlugin(FilePondPluginImagePreview);

function Publish({ type = "Feed" }) {
  const { publishType, setPublishType } = usePublishType();

  const [content, setContent] = useState("");
  const [showPick, setShowPick] = useState(false);
  const [shouldShowFilePond, setShouldShowFilePond] = useState(false);
  const [files, setFiles] = useState([]);
  const { authData } = useAuth();
  const queryClient = useQueryClient();
  const emojiPickerRef = useRef(null);
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    // Trigger FilePond's browse files
    fileInputRef.current?.browse();
    setShouldShowFilePond(true);
  };

  const handleFilesUpdate = (files) => {
    setUploadedFiles(files);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append("image", file);
    });
    formData.append("content", content);
    formData.append("type", type);
    await CreateFeed(formData);
    queryClient.invalidateQueries("feeds");
    setContent("");
    setPublishType({});
    handleFilesUpdate([]);
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
      {publishType?.type === "Comment" && (
        <EchoContent feed={publishType?.feed} />
      )}
      <UserCard user={authData} isBtnDisplay={false} />
      <form onSubmit={handleSubmit} className="">
        <textarea
          className="h-16 w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:border-blue-500 focus:outline-none"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={4}
          required
        />
        <div className="mt-3 flex gap-6 space-y-2">
          <button
            type="button"
            onClick={togglePicker}
            className="rounded-full p-2 text-gray-700 hover:bg-gray-200"
          >
            <MdEmojiEmotions />
          </button>
          <div>
            <button
              type="button"
              onClick={handleAvatarClick}
              className="cursor-pointer"
            >
              <GoPaperclip />
            </button>
          </div>
        </div>
        {showPick && (
          <div ref={emojiPickerRef}>
            <EmojiPicker content={content} setContent={setContent} />
          </div>
        )}

        {shouldShowFilePond && (
          <div className="bg-red-30">
            <FilePond
              itemInsertLocation="before"
              ref={fileInputRef}
              files={files}
              allowReorder={true}
              allowMultiple={true}
              maxFiles={4}
              onupdatefiles={(fileItems) => {
                // Update the file array based on operation in FilePond
                const newFiles = fileItems.map((fileItem) => fileItem.file);
                setFiles(newFiles);
                handleFilesUpdate(newFiles);
              }}
              labelIdle=""
            />
          </div>
        )}
        <SubmitButton pendingLabel="Posting...">Echo!</SubmitButton>
      </form>
    </div>
  );
}

export default Publish;
