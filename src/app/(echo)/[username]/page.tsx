import BackBtn from "@/app/_components/BackBtn";
import FeedList from "@/app/_components/FeedList";
import UserCard from "@/app/_components/UserCard";
import UserDetail from "@/app/_components/UserDetail";
import { ParamsProps } from "@/app/_config/type";
import { getFeedByUsername, getUserByName } from "@/app/_services/fetchDataAPI";
import { useAuth } from "@/app/_utils/getLogin";
import Image from "next/image";
import { Suspense } from "react";

export async function generateMetadata({ params }: ParamsProps) {
  return { title: `${params.username}` };
}

async function page({ params }: ParamsProps) {
  const username = params.username;
  const feeds = await getFeedByUsername(username);

  return (
    <div>
      <UserDetail username={username} />
      <FeedList feeds={feeds} />
    </div>
  );
}

export default page;
