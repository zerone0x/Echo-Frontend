import NotificationItem from "./NotificationItem";

function NotificationList({ notifications }) {
  console.log(notifications);

  return (
    notifications.length > 0 &&
    notifications.map((notification, index) => {
      return <NotificationItem key={index} notification={notification} />;
    })
  );
}

export default NotificationList;
