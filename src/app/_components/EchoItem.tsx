"use client";
import { FormatTime } from "@/app/_utils/FormatData";
import TextExpander from "./TextExpander";
import Link from "next/link";
import UserCard from "./UserCard";
import { useAuth } from "../_utils/getLogin";
import Reaction from "./Reaction";
import Image from "next/image";
import { useState } from "react";
import ImageCarousel from "./ImageCarousel";
import { IoMdClose } from "react-icons/io";

function EchoItem({ feed }: { feed: any }) {
  const user = feed?.user;
  const content = feed?.content;
  const createdAt = feed?.createdAt;
  const feedImages = feed?.feedImages;
  const name = user?.name;
  const { authData, setAuthData, currentUserId } = useAuth();
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const feedId = feed?.id;
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setShowCarousel(true);
  };
  return (
    feed && (
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <Link href={`/${name}/status/${feedId}`}>
          <div className="flex items-center justify-between p-4">
            <UserCard user={user} isBtnDisplay={false} />
            <span className="text-sm text-gray-500">
              {FormatTime(createdAt)}
            </span>
          </div>
          <div className="px-4 py-2">
            <TextExpander>{content}</TextExpander>
          </div>
        </Link>
        {feedImages.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {feedImages.map((imageUrl, index) => (
              // 不要用传递的参数给click event 因为参数是event
              <div
                onClick={() => handleImageClick(index)}
                key={index}
                className="cursor-zoom-in"
              >
                <Image
                  src={imageUrl}
                  alt={`Echo ${index}`}
                  width={300}
                  height={200}
                />
              </div>
            ))}
          </div>
        )}

        <Reaction feedId={feedId} />

        {showCarousel && (
          <div className="z-100 fixed inset-0 bg-black bg-opacity-80">
            <button
              onClick={() => setShowCarousel(false)}
              className="bg-grey-700 absolute right-4 top-4 z-10 rounded-full bg-opacity-70 p-2 text-xl text-white"
            >
              <IoMdClose />
            </button>
            <ImageCarousel
              images={feedImages}
              initialIndex={currentImageIndex}
            />
          </div>
        )}
      </div>
    )
  );
}

export default EchoItem;
