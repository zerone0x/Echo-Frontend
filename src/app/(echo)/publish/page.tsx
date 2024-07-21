import Publish from "@/app/_components/Publish";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publish",
};

function page() {
  return <Publish />;
}

export default page;
