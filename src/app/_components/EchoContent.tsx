import Link from "next/link";
import { FormatTime } from "../_utils/FormatData";
import TextExpander from "./TextExpander";
import UserCard from "./UserCard";
import Image from "next/image";
import { CommentProps, FeedProps } from "../_config/type";

function EchoContent({ feed }: { feed: FeedProps | CommentProps }) {
  const { type, user, content, createdAt, feedImages } = feed;
  const feedId = type === "Feed" ? feed?.id : feed._id;
  return (
    <>
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
            <div key={index}>
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
    </>
  );
}

export default EchoContent;
