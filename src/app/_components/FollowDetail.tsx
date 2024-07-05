"use client";
import Link from "next/link";
import { useQuery } from "react-query";
import Loading from "../loading";
import { getFans, getFollow } from "../_services/fetchDataAPI";
import SpinnerMini from "./SpinnerMini";

function FollowDetail({ username, feedLen }) {
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
    const message = followingError?.message || followersError?.message;
    return <div>Error: {message}</div>;
  }
  return (
    <div>
      <Link href={`/${username}`}>
        <span>{feedLen} posts </span>
      </Link>
      <Link href={`/${username}/following`}>
        <span>{followingData?.length} Following</span>
      </Link>
      <Link href={`/${username}/followers`}>
        <span>{followersData?.length} Followers</span>
      </Link>
    </div>
  );
}

export default FollowDetail;
