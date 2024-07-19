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
  const { type, user, content, createdAt, feedImages } = feed;
  const { likesCount, commentsCount } = feed;
  const name = user?.name;
  const { authData, setAuthData, currentUserId } = useAuth();
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const feedId = type === "Feed" ? feed?.id : feed._id;
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setShowCarousel(true);
  };

  return (
    feed && (
      <div className="border-b-2">
        <div className="flex items-center justify-between p-4">
          <UserCard user={user} isBtnDisplay={false} />
          <span className="text-sm text-gray-500">{FormatTime(createdAt)}</span>
        </div>
        <Link
          href={
            type === "Feed"
              ? `/${name}/status/${feedId}`
              : `/${name}/status/${feed?.feed}`
          }
        >
          <div className="pointer-events-none block px-4 py-2">
            <TextExpander>{content}</TextExpander>
          </div>
        </Link>
        {feedImages?.length > 0 && (
          <div className="grid grid-cols-2 gap-2 p-4">
            {feedImages.map((imageUrl, index) => (
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
        <Reaction
          feedId={feedId}
          type={type}
          likesCount={likesCount}
          commentsCount={commentsCount}
          user={user}
        />
        {showCarousel && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-80">
            <div className="z-100 relative">
              <div
                onClick={(event) => {
                  if (event.target === event.currentTarget) {
                    setShowCarousel(false);
                  }
                }}
              >
                <button
                  onClick={() => setShowCarousel(false)}
                  className="bg-grey-700 z-100 absolute right-4 top-4 rounded-full bg-opacity-70 p-2 text-xl text-white"
                >
                  <IoMdClose />
                </button>
                <ImageCarousel
                  images={feedImages}
                  initialIndex={currentImageIndex}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default EchoItem;
