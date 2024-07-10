"use client";
import { FormatTime } from "@/app/_utils/FormatData";
import TextExpander from "./TextExpander";
import Link from "next/link";
import UserCard from "./UserCard";
import { useAuth } from "../_utils/getLogin";
import Reaction from "./Reaction";
import Image from "next/image";
import ImageCarousel from "./imageCarousel";
import { useState } from "react";

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
  const handleImageClick = (index) => {
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
          {feedImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {feedImages.map((imageUrl, index) => (
                <div onClick={handleImageClick} key={index}>
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
        </Link>
        <Reaction feedId={feedId} />
        {showCarousel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <ImageCarousel
              images={feedImages}
              initialIndex={currentImageIndex}
              onClose={() => setShowCarousel(false)}
            />
          </div>
        )}
      </div>
    )
  );
}

export default EchoItem;
