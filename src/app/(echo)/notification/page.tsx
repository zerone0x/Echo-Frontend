import Notify from "@/app/_components/Notify";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notification",
};

async function page() {
  return <Notify />;
}

export default page;
