"use client";
import { IoMdClose } from "react-icons/io";
import SubmitButton from "./SubmitButton";
import { useRef, useState } from "react";
import { useAuth } from "../_utils/getLogin";
import { updateUser } from "../_services/fetchDataAPI";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Image from "next/image";
import AvatarUploader from "./AvatorUpload";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function UpdateUserDetail({ isOpen, setOpenDialog }) {
  const { authData } = useAuth();
  console.log(authData);

  const default_name = authData?.username;
  const default_bio = authData?.Bio;
  const avatar = authData?.ProfileImage;
  const banner = authData?.Banner;
  const [name, setName] = useState(default_name);
  const [bio, setBio] = useState(default_bio);
  const [file, setFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", name);
    formData.append("bio", bio);
    formData.append("ProfileImage", file);
    formData.append("Banner", bannerFile);
    await updateUser(formData);
    setOpenDialog(false);
    setFile(null);
    setBannerFile(null);
  }
  return (
    <dialog
      open={isOpen}
      className="fixed left-0 right-0 top-0 z-50 mx-auto mt-4 w-full max-w-full overflow-scroll rounded-lg bg-white p-5 shadow-xl sm:max-w-lg"
    >
      <form
        method="dialog"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <h2 className="mb-2 text-xl font-semibold text-gray-900 sm:mb-0 sm:text-2xl">
            Update User Details
          </h2>
          <button
            onClick={() => setOpenDialog(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoMdClose />
          </button>
        </div>

        <AvatarUploader
          avatar={avatar}
          onUpdate={(newFile) => setFile(newFile)}
          labelName="Avator"
        />
        <AvatarUploader
          avatar={banner}
          onUpdate={(bannerfile) => setBannerFile(bannerfile)}
          labelName="Banner"
          isBig={true}
        />

        <label
          htmlFor="name"
          className="text-lg font-medium text-gray-700 sm:text-xl"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          className="input rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          onChange={(e) => setName(e.target.value)}
        />
        <label
          htmlFor="bio"
          className="text-lg font-medium text-gray-700 sm:text-xl"
        >
          Bio
        </label>
        <textarea
          id="bio"
          className="input rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <SubmitButton pendingLabel="Saving...">Save</SubmitButton>
      </form>
    </dialog>
  );
}

export default UpdateUserDetail;
