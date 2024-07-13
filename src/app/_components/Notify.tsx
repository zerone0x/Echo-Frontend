"use client";
import { useQuery } from "react-query";
import { getAllNotifications } from "../_services/fetchDataAPI";
import Loading from "../loading";

function Notify() {
  const { data, error, isLoading } = useQuery(
    "notifications",
    () => getAllNotifications(),
    {
      enabled: true,
    },
  );
  if (isLoading) return <Loading />;
  if (error) return <div>Error loading notifications: {error.message}</div>;
  const notifications = data;
  console.log("hhhhhhhhhhhhhhhhhhhhhh");

  console.log("##########", notifications);
  return <p>Notify</p>;
}

export default Notify;
