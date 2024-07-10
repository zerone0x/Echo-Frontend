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

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function UpdateUserDetail({ isOpen, setOpenDialog }) {
  const { authData } = useAuth();
  console.log(authData);

  const default_name = authData?.username;
  const default_bio = authData?.Bio;
  const default_avatar = authData?.ProfileImage;
  const default_Banner = authData?.Banner;
  const [name, setName] = useState(default_name);
  const [bio, setBio] = useState(default_bio);
  const [avatar, setAvatar] = useState(default_avatar);
  const [banner, setBanner] = useState(default_Banner);
  const [file, setFile] = useState(null);

  // Ref to the hidden file input
  const fileInputRef = useRef(null);

  // Function to trigger the hidden file input
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    await updateUser(formData);
    setOpenDialog(false);
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
        <label htmlFor="banner" />
        <input type="file" id="banner" accept="image/*" className="input" />

        <div onClick={handleAvatarClick} style={{ cursor: "pointer" }}>
          <Image src={avatar} width={300} height={200} alt="avatar" />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            // Set the file to the first file in the input file list
            setFile(e.target.files[0] || null); // Set to null if no files selected
          }}
        />
        <FilePond
          files={file ? [file] : []}
          allowReorder={false}
          allowMultiple={false}
          onupdatefiles={(fileItems) => {
            // Update the file based on what's currently in the FilePond
            setFile(fileItems.length ? fileItems[0].file : null);
          }}
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
          required
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
