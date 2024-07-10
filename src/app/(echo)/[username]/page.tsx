import BackBtn from "@/app/_components/BackBtn";
import FeedList from "@/app/_components/FeedList";
import FollowBtn from "@/app/_components/FollowBtn";
import FollowDetail from "@/app/_components/FollowDetail";
import Spinner from "@/app/_components/Spinner";
import UserCard from "@/app/_components/UserCard";
import UserDetail from "@/app/_components/UserDetail";
import { getFeedByUsername, getUserByName } from "@/app/_services/fetchDataAPI";
import { useAuth } from "@/app/_utils/getLogin";
import Image from "next/image";
import { Suspense } from "react";

async function page({ params }) {
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
