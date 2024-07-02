"use client";
import UserCard from "@/app/_components/UserCard";
import { getFans, getFollow } from "@/app/_services/fetchDataAPI";
import Loading from "@/app/loading";
import { useQuery } from "react-query";

function page({ params }) {
  const username = params.username;
  const {
    data: followingData,
    error: followingError,
    isLoading: followingLoading,
  } = useQuery(["following", username], () => getFollow(username));

  if (followingLoading) {
    return <Loading />;
  }

  if (followingError) {
    const message = followingError?.message;
    return <div>Error: {message}</div>;
  }
  return (
    <>
      {followingData?.ppl.map((item, index) => (
        <UserCard key={index} user={item} />
      ))}
    </>
  );
}

export default page;
