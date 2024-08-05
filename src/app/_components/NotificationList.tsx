import { NotificationProps } from "../_config/type";
import NoResult from "./NoResult";
import NotificationItem from "./NotificationItem";

function NotificationList({
  notifications,
}: {
  notifications: NotificationProps[];
}) {
  return notifications.length > 0 ? (
    notifications.map((notification, index) => {
      return <NotificationItem key={index} notification={notification} />;
    })
  ) : (
    <NoResult content="You don't have any notification yet. When you have one, it will show up here."></NoResult>
  );
}

export default NotificationList;
