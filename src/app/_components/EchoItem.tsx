"use client";
import { FormatTime } from "@/app/_utils/FormatData";
import TextExpander from "./TextExpander";
import Link from "next/link";
import UserCard from "./UserCard";
import { useAuth } from "../_utils/getLogin";
import Reaction from "./Reaction";
import Image from "next/image";
import ImageCarousel from "./imageCarousel";

function EchoItem({ feed }: { feed: any }) {
  const user = feed?.user;
  const content = feed?.content;
  const createdAt = feed?.createdAt;
  const feedImages = feed?.feedImages;
  const name = user?.name;
  const { authData, setAuthData, currentUserId } = useAuth();
  const feedId = feed?.id;

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
            <>
              {/* {feedImages.map((imageUrl, index) => (
        <Image src={imageUrl} alt={`Echo ${index}`} width={300} height={200} key={index} />
      ))} */}
              <ImageCarousel images={feedImages} />
            </>
          )}
        </Link>
        <Reaction feedId={feedId} />
      </div>
    )
  );
}

export default EchoItem;
