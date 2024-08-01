import Link from "next/link";
import { NotificationProps } from "../_config/type";
import { FormatTime } from "../_utils/FormatData";
import UserCard from "./UserCard";
import TextExpander from "./TextExpander";
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
      <div className="border-b-2">
        <p>
          <Link href={`/${sender.name}`}>{sender.name} </Link>
          followed you
        </p>
        <>
          <div className="flex justify-between p-4">
            <UserCard user={sender} isBtnDisplay={true} />
            <span className="text-sm text-gray-500">
              {FormatTime(createdAt)}
            </span>
          </div>
        </>
      </div>
    );
  } else if (action === "like") {
    return (
      <div className="border-b-2">
        <p>
          <Link href={`/${sender.name}`}>{sender.name} </Link>
          liked your post
        </p>
        <>
          <div className="flex justify-between p-4">
            <UserCard user={receiver} isBtnDisplay={false} />
            <span className="text-sm text-gray-500">
              {FormatTime(createdAt)}
            </span>
          </div>
          <Link
            href={
              type === "Feed"
                ? `/${name}/status/${content._id}`
                : `/${name}/status/${content?.feed}`
            }
          >
            <div className="pointer-events-none block px-4 py-2">
              <TextExpander>{content.content}</TextExpander>
            </div>
          </Link>
        </>
      </div>
    );
  } else if (action === "comment") {
    return (
      <div className="border-b-2">
        <p>
          <Link href={`/${sender.name}`}>{sender.name} </Link>
          commented your post
        </p>
        <>
          <div className="flex justify-between p-4">
            <UserCard user={sender} isBtnDisplay={false} />
            <span className="text-sm text-gray-500">
              {FormatTime(createdAt)}
            </span>
          </div>
          <Link
            href={
              type === "Feed"
                ? `/${name}/status/${content._id}`
                : `/${name}/status/${content?.feed}`
            }
          >
            <div className="pointer-events-none block px-4 py-2">
              <TextExpander>{content.content}</TextExpander>
            </div>
          </Link>
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
