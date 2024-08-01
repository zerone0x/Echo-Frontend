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
import { CommentProps, FeedProps } from "../_config/type";

function EchoItem({ feed }: { feed: FeedProps | CommentProps }) {
  const { type, user, content, createdAt, feedImages } = feed;
  const { likesCount, commentsCount } = feed;
  const name = user?.name;
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
        <>
          <div className="flex items-center justify-between p-4">
            <UserCard user={user} isBtnDisplay={false} />
            <span className="text-sm text-gray-500">
              {FormatTime(createdAt)}
            </span>
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
            <div className="w-full">
              <div className={`grid w-full grid-cols-2 gap-2 p-4`}>
                {feedImages.map((imageUrl, index) => (
                  <div
                    onClick={() => handleImageClick(index)}
                    key={index}
                    className={`cursor-zoom-in ${feedImages.length < 3 ? "h-full" : "h-1/2"} `}
                  >
                    <Image
                      src={imageUrl}
                      alt={`Echo ${index}`}
                      layout="responsive"
                      objectFit="cover"
                      width={500}
                      height={500}
                      className="h-full w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
        <Reaction
          feed={feed}
          type={type}
          likesCount={likesCount}
          commentsCount={commentsCount}
          user={user}
        />
        {showCarousel && (
          <>
            <div className="fixed inset-0 z-40 bg-black bg-opacity-50"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <button
                onClick={() => setShowCarousel(false)}
                className="z-100 absolute right-4 top-4 rounded-full bg-gray-700 bg-opacity-70 p-2 text-xl text-white"
              >
                <IoMdClose className="h-6 w-6" />
              </button>
              <div
                className="z-100 fixed inset-0"
                onClick={() => setShowCarousel(false)}
              ></div>
              <dialog
                open={showCarousel}
                className="z-100 relative border-none bg-transparent"
              >
                <div className="h-full max-h-[50vh] w-full max-w-[70vw]">
                  <ImageCarousel
                    images={feedImages}
                    initialIndex={currentImageIndex}
                  />
                </div>
              </dialog>
            </div>
          </>
        )}
      </div>
    )
  );
}

export default EchoItem;
