import Header from "@/app/_components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notification",
};

function page() {
  return (
    <>
      <Header title="Notification" />
    </>
  );
}

export default page;
