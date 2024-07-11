"use client";
import React, { useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Image from "next/image";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AvatarUploader = ({ avatar, onUpdate }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div onClick={handleAvatarClick} style={{ cursor: "pointer" }}>
        <Image src={avatar} width={300} height={200} alt="avatar" />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0] || null;
          setFile(file);
          onUpdate(file);
        }}
      />
      <FilePond
        files={file ? [file] : []}
        allowReorder={false}
        allowMultiple={false}
        onupdatefiles={(fileItems) => {
          const newFile = fileItems.length ? fileItems[0].file : null;
          setFile(newFile);
          onUpdate(newFile);
        }}
        labelIdle=""
      />
    </div>
  );
};

export default AvatarUploader;
