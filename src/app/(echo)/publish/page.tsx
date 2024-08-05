import BackBtn from "@/app/_components/BackBtn";
import Publish from "@/app/_components/Publish";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publish",
};

function page() {
  return (
    <>
      <BackBtn />
      <Publish />
    </>
  );
}

export default page;
