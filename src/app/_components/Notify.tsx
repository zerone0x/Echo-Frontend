"use client";
import { useQuery } from "react-query";
import { getAllNotifications } from "../_services/fetchDataAPI";
import Loading from "../loading";
import NotificationList from "./NotificationList";

function Notify() {
  const { data, error, isLoading } = useQuery(
    "notifications",
    () => getAllNotifications(),
    {
      enabled: true,
    },
  );
  if (isLoading) return <Loading />;
  if (error instanceof Error)
    return <div>Error loading notifications: {error.message}</div>;

  return <NotificationList notifications={data} />;
}

export default Notify;
