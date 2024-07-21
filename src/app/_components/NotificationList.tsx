import { NotificationProps } from "../_config/type";
import NotificationItem from "./NotificationItem";

function NotificationList({
  notifications,
}: {
  notifications: NotificationProps[];
}) {
  return (
    notifications.length > 0 &&
    notifications.map((notification, index) => {
      return <NotificationItem key={index} notification={notification} />;
    })
  );
}

export default NotificationList;
