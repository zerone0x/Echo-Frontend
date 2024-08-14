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
// import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// import FilePondPluginImageTransform from "filepond-plugin-image-transform";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import FilePondPluginImageResize from "filepond-plugin-image-resize";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { usePublishType } from "../_utils/getPublishType";
import EchoContent from "./EchoContent";

// Register the plugins
// registerPlugin(FilePondPluginImageTransform, FilePondPluginImageResize);

function Publish({ isPage = true }) {
  const { publishType, setPublishType } = usePublishType();
  const [content, setContent] = useState("");
  const [showPick, setShowPick] = useState(false);
  const [shouldShowFilePond, setShouldShowFilePond] = useState(false);
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { authData } = useAuth();
  const queryClient = useQueryClient();
  const emojiPickerRef = useRef(null);
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const postType = publishType?.type === "Comment" ? "Comment" : "Feed";
  const PublishFeed = publishType?.feed;
  const feedId = PublishFeed?._id;
  const name = PublishFeed?.user?.name;

  const handleAvatarClick = () => {
    // Trigger FilePond's browse files
    // @ts-ignore
    fileInputRef.current?.browse();
    setShouldShowFilePond(true);
  };
  // @ts-ignore
  const handleFilesUpdate = (files) => {
    setUploadedFiles(files);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append("image", file);
    });
    formData.append("content", content);
    formData.append("type", postType);
    if (postType === "Comment") {
      formData.append("feed", feedId);
    }
    await CreateFeed(formData);
    queryClient.invalidateQueries("feeds");
    setContent("");
    setPublishType({});
    handleFilesUpdate([]);
    setFiles([]);
    setShowPick(false);
    setIsSubmitting(false);
    toast.success("Post published.");
    if (postType === "Comment") {
      router.push(`/user/${name}/status/${feedId}`);
    } else {
      router.push(`/home`);
    }
  };

  const togglePicker = () => {
    setShowPick(() => !showPick);
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
        // @ts-ignore
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowPick(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiPickerRef, showPick]);

  useEffect(() => {
    if (!isPage) {
      setPublishType({ type: "Feed" });
    }
  }, [setPublishType]);

  return (
    <div className="max-h-screen">
      {publishType?.type === "Comment" && isPage && (
        <div className="pointer-events-none">
          <EchoContent feed={publishType?.feed} />
        </div>
      )}
      <div className="p-4">
        <div>
          <div
            className={`${postType === "Comment" && isPage ? "border-l-2 p-4" : ""}`}
          >
            {/* @ts-ignore */}
            <UserCard user={authData} isBtnDisplay={false} />
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <textarea
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:border-[#CC3355] focus:outline-none focus:ring-1 focus:ring-[#CC3355]"
              placeholder={`${postType === "Comment" && isPage ? "Reply to" : "What's on your mind?"}`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={5}
              style={{ resize: "none" }}
              required
            />

            <div className="mt-3 flex items-center gap-6">
              <button type="button" onClick={togglePicker} className=" ">
                <MdEmojiEmotions size={24} />
              </button>
              <button type="button" onClick={handleAvatarClick} className=" ">
                <GoPaperclip size={24} />
              </button>
            </div>
            {showPick && (
              <div
                ref={emojiPickerRef}
                className="absolute z-10 rounded-lg bg-white p-4 shadow-lg"
              >
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
                    // @ts-ignore
                    setFiles(newFiles);
                    handleFilesUpdate(newFiles);
                  }}
                  labelIdle=""
                />
              </div>
            )}
            <div className="text-right">
              <button className="btn" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Echo!"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Publish;
