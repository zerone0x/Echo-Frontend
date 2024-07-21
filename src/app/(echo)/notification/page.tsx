import { Metadata } from "next";
import Notify from "@/app/_components/Notify";

export const metadata: Metadata = {
  title: "Notification",
};

async function page() {
  return <Notify />;
}

export default page;
