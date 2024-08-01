"use client";
import { IoMdClose } from "react-icons/io";
import SubmitButton from "./SubmitButton";
import { useRef, useState } from "react";
import { useAuth } from "../_utils/getLogin";
import { updateUser } from "../_services/fetchDataAPI";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
// import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import AvatarUploader from "./AvatorUpload";
// Register the plugins
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface UpdateUserDetailProps {
  isOpen: boolean;
  setOpenDialog: (isOpen: boolean) => void;
}

function UpdateUserDetail({ isOpen, setOpenDialog }: UpdateUserDetailProps) {
  const { authData } = useAuth();
  const default_name = authData?.username;
  const default_bio = authData?.Bio;
  const avatar = authData?.ProfileImage;
  const banner = authData?.Banner;
  const [name, setName] = useState(default_name);
  const [bio, setBio] = useState(default_bio);
  const [file, setFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData();
    // @ts-ignore
    formData.append("username", name);
    // @ts-ignore
    formData.append("bio", bio);
    // @ts-ignore
    formData.append("ProfileImage", file);
    // @ts-ignore
    formData.append("Banner", bannerFile);
    await updateUser(formData);
    setOpenDialog(false);
    setFile(null);
    setBannerFile(null);
  }
  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setOpenDialog(false)}
          ></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <dialog
              open={isOpen}
              className="w-full max-w-full rounded-lg bg-white p-5 shadow-xl sm:max-w-lg"
            >
              <form
                method="dialog"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <h2 className="mb-4 text-xl font-semibold text-gray-900 sm:mb-0 sm:text-2xl">
                    Update User Details
                  </h2>
                  <button
                    onClick={() => setOpenDialog(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <IoMdClose className="h-8 w-8" />
                  </button>
                </div>

                <AvatarUploader
                  // @ts-ignore
                  avatar={avatar}
                  // @ts-ignore
                  onUpdate={(newFile) => setFile(newFile)}
                  labelName="Avator"
                />
                <AvatarUploader
                  // @ts-ignore
                  avatar={banner}
                  // @ts-ignore
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
                  style={{ resize: "none" }}
                  rows={4}
                ></textarea>
                <div className="text-right">
                  <SubmitButton pendingLabel="Saving...">Save</SubmitButton>
                </div>
              </form>
            </dialog>
          </div>
        </>
      )}
    </>
  );
}

export default UpdateUserDetail;
