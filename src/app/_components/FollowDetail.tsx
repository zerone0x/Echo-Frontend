"use client";
import Link from "next/link";
import { useQuery } from "react-query";
import { getFans, getFollow } from "../_services/fetchDataAPI";
import SpinnerMini from "./SpinnerMini";

interface QueryError {
  message?: string;
}

function FollowDetail({
  username,
  feedLen,
}: {
  username: string;
  feedLen: number;
}) {
  const {
    data: followingData,
    error: followingError,
    isLoading: followingLoading,
  } = useQuery(["following", username], () => getFollow(username));

  const {
    data: followersData,
    error: followersError,
    isLoading: followersLoading,
  } = useQuery(["followers", username], () => getFans(username));

  if (followingLoading || followersLoading) {
    return <SpinnerMini />;
  }

  if (followingError || followersError) {
    // @ts-ignore
    const message = followingError?.message || followersError?.message;
    return <div>Error: {message}</div>;
  }
  return (
    <div className="border-b-2 p-4">
      <Link
        href={`/user/${username}`}
        className="hover:text-[#675AF2] hover:underline"
      >
        <span>{feedLen} posts </span>
      </Link>
      <Link
        href={`/user/${username}/following`}
        className="hover:text-[#675AF2] hover:underline"
      >
        <span>{followingData?.length} Following </span>
      </Link>
      <Link
        href={`/user/${username}/followers`}
        className="hover:text-[#675AF2] hover:underline"
      >
        <span>{followersData?.length} Followers</span>
      </Link>
    </div>
  );
}

export default FollowDetail;
