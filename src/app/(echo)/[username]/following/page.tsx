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
    data: followingData,
    error: followingError,
    isLoading: followingLoading,
  } = useQuery(["following", username], () => getFollow(username));

  // if (followingLoading) {
  //   return <Loading />;
  // }

  if (followingError) {
    const message = followingError?.message;
    return <div>Error: {message}</div>;
  }
  return (
    <>
      <UserDetail username={username} />
      {followingData?.ppl.map((item, index) => (
        <UserCard key={index} user={item} />
      ))}
    </>
  );
}

export default page;
