"use client";
import Notify from "@/app/_components/Notify";
import { getAllNotifications } from "@/app/_services/fetchDataAPI";
import { Metadata } from "next";
import Loading from "../loading";
import { useQuery } from "react-query";
import NotificationList from "@/app/_components/NotificationList";

// export const metadata: Metadata = {
//   title: "Notification",
// };

async function page() {
  const { data, error, isLoading } = useQuery(
    "notifications",
    () => getAllNotifications(),
    {
      enabled: true,
    },
  );
  if (isLoading) return <Loading />;
  if (error) return <div>Error loading notifications: {error.message}</div>;

  return <NotificationList notifications={data} />;
}

export default page;
