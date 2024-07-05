"use client";
import FollowBtn from "@/app/_components/FollowBtn";
import UserCard from "@/app/_components/UserCard";
import { getFans, getFollow } from "@/app/_services/fetchDataAPI";
import Loading from "@/app/loading";
import { useQuery } from "react-query";

function page({ params }) {
  const username = params.username;
  const {
    data: followersData,
    error: followersError,
    isLoading: followersLoading,
  } = useQuery(["followers", username], () => getFans(username));

  if (followersLoading) {
    return <Loading />;
  }

  if (followersError) {
    const message = followersError?.message;
    return <div>Error: {message}</div>;
  }
  return (
    <>
      {followersData?.ppl.map((item, index) => (
        <UserCard key={index} user={item} />
      ))}
    </>
  );
}

export default page;
