import Followed from "@/app/_components/Followed";
import { ParamsProps } from "@/app/_config/type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Following",
};

function page({ params }: ParamsProps) {
  const username = params.username;

  return (
    <>
      <Followed username={username} />
    </>
  );
}

export default page;
