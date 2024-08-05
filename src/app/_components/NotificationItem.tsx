import Link from "next/link";
import { NotificationProps } from "../_config/type";
import { FormatTime } from "../_utils/FormatData";
import UserCard from "./UserCard";
import TextExpander from "./TextExpander";
import Image from "next/image";
// const ActionEnum = Object.freeze({
//   LIKE: "like",
//   COMMENT: "comment",
//   SHARE: "share",
//   FOLLOW: "follow",
//   BOOKMARK: "bookmark",
// });

function NotificationItem({
  notification,
}: {
  notification: NotificationProps;
}) {
  const { sender, receiver, content, createdAt, type, action, status } =
    notification;
  if (action === "follow") {
    return (
      <div className="flex flex-col gap-2 border-b-2 p-4">
        <div className="flex justify-between">
          <p>
            <Link href={`/user/${sender.name}`} className="hover:underline">
              {sender.name}{" "}
            </Link>
            followed you
          </p>
          <span className="text-sm text-gray-500">{FormatTime(createdAt)}</span>
        </div>
        <UserCard user={sender} isBtnDisplay={true} />
      </div>
    );
  } else if (action === "like") {
    return (
      <div className="flex flex-col gap-2 border-b-2 p-4">
        <div className="flex justify-between">
          <p>
            <Link href={`/user/${sender.name}`} className="hover:underline">
              {sender.name}{" "}
            </Link>
            liked your post
          </p>
          <span className="text-sm text-gray-500">{FormatTime(createdAt)}</span>
        </div>
        <>
          <UserCard user={receiver} isBtnDisplay={false} />
          <Link
            href={
              type === "Feed"
                ? `/user/${receiver.name}/status/${content._id}`
                : // @ts-ignore
                  `/user/${receiver.name}/status/${content?.feed}`
            }
          >
            <div className="pointer-events-none block px-4 py-2">
              <TextExpander>{content.content}</TextExpander>
            </div>
          </Link>
          {Array.isArray(content.feedImages) &&
            content.feedImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2 p-4">
                {content.feedImages.map((imageUrl, index) => (
                  <div key={index}>
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
            )}
        </>
      </div>
    );
  } else if (action === "comment") {
    return (
      <div className="flex flex-col gap-2 border-b-2 p-4">
        <div className="flex justify-between">
          <p>
            <Link href={`/user/${sender.name}`} className="hover:underline">
              {sender.name}{" "}
            </Link>
            commented your post
          </p>
          <span className="text-sm text-gray-500">{FormatTime(createdAt)}</span>
        </div>
        <>
          <UserCard user={sender} isBtnDisplay={false} />
          <Link
            href={
              type === "Feed"
                ? `/user/${sender.name}/status/${content._id}`
                : // @ts-ignore
                  `/user/${sender.name}/status/${content?.feed}`
            }
          >
            <div className="pointer-events-none block px-4 py-2">
              <TextExpander>{content.content}</TextExpander>
            </div>
          </Link>
          {Array.isArray(content.feedImages) &&
            content.feedImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2 p-4">
                {content.feedImages.map((imageUrl, index) => (
                  <div key={index}>
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
            )}
        </>
      </div>
    );
  }
  // return (
  //   <>
  //     {/* {action="like" && } */}
  //     <p>
  //       {sender.name} sent you a {type} {content?.content} with {action} on{" "}
  //       {FormatTime(createdAt)}
  //     </p>
  //   </>
  // );
}

export default NotificationItem;
