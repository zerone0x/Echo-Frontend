import Follower from "@/app/_components/Follower";
import { ParamsProps } from "@/app/_config/type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Followers",
};

function page({ params }: ParamsProps) {
  const username = params.username;

  return (
    <>
      <Follower username={username} />
    </>
  );
}

export default page;
