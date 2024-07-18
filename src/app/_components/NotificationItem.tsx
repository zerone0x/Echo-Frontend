import { FormatTime } from "../_utils/FormatData";

function NotificationItem({ notification }) {
  const { sender, receiver, content, createdAt, type, action, status } =
    notification;
  return (
    <>
      <p>
        {sender.name} sent you a {type} {content?.content} with {action} on{" "}
        {FormatTime(createdAt)}
      </p>
    </>
  );
}

export default NotificationItem;
