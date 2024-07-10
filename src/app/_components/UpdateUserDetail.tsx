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
    <dialog open={isOpen}>
      <form
        method="dialog"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <button onClick={() => setOpenDialog(false)}>
          <IoMdClose />
        </button>
        <h2>Update User Details</h2>
        <AvatarUploader
          avatar={banner}
          onUpdate={(bannerfile) => setBannerFile(bannerfile)}
        />

        <AvatarUploader
          avatar={avatar}
          onUpdate={(newFile) => setFile(newFile)}
        />
        <label htmlFor="name" className="text-xl">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          className="input"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="bio" className="text-xl">
          Bio
        </label>
        <textarea
          id="bio"
          className="input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <SubmitButton pendingLabel="Saving...">Save</SubmitButton>
      </form>
    </dialog>
  );
}

export default UpdateUserDetail;
