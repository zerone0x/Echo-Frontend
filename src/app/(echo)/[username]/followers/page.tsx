"use client";
import FollowBtn from "@/app/_components/FollowBtn";
import UserCard from "@/app/_components/UserCard";
import UserDetail from "@/app/_components/UserDetail";
import { getFans, getFollow } from "@/app/_services/fetchDataAPI";
import Loading from "@/app/loading";
import { Suspense } from "react";
import { useQuery } from "react-query";

function page({ params }) {
  const username = params.username;
  const {
    data: followersData,
    error: followersError,
    isLoading: followersLoading,
  } = useQuery(["followers", username], () => getFans(username));

  // if (followersLoading) {
  //   return <Loading />;
  // }

  if (followersError) {
    const message = followersError?.message;
    return <div>Error: {message}</div>;
  }
  return (
    <>
      <UserDetail username={username} />
      {followersData?.ppl.map((item, index) => (
        <UserCard key={index} user={item} />
      ))}
    </>
  );
}

export default page;
