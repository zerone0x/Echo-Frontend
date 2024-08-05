"use client";
import React, { useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
// import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Image from "next/image";

// Register the plugins
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AvatarUploader = ({
  avatar,
  onUpdate,
  labelName,
  isBig = false,
}: {
  avatar: string;
  onUpdate: any;
  labelName: string;
  isBig?: boolean;
}) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex justify-between gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="avatar"
          className="text-lg font-medium text-gray-700 sm:text-xl"
        >
          {labelName}
        </label>
        <div className="flex flex-row gap-2">
          {isBig ? (
            <div
              className="relative h-36 w-60  overflow-hidden"
            >
              <Image
                src={avatar}
                alt="Banner"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          ) : (
            <div
              className="relative h-16 w-16 overflow-hidden rounded-full"
            >
              <Image
                src={avatar}
                alt="Avatar"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          )}
        </div>
      </div>
      <div className="relative flex h-36 w-1/2 cursor-pointer flex-col gap-2 overflow-hidden">
        <span>Update {labelName}:</span>
        <FilePond
          files={file ? [file] : []}
          allowReorder={false}
          allowMultiple={false}
          onupdatefiles={(fileItems) => {
            const newFile = fileItems.length ? fileItems[0].file : null;
            // @ts-ignore
            setFile(newFile);
            onUpdate(newFile);
          }}
          labelIdle="Drag & Drop your avatar or <span class='filepond--label-action'>Browse</span>"
        />
      </div>
    </div>
  );
};

export default AvatarUploader;
