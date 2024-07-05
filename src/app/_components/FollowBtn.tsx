"use client";
import { AddFollow, getIsFollowed } from "@/app/_services/fetchDataAPI";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useAuth } from "../_utils/getLogin";

function FollowBtn({ username }) {
  const [follow, setFollow] = useState(false);
  const queryClient = useQueryClient();
  const { currentUserName } = useAuth();
  useEffect(() => {
    async function fetchStatuses() {
      const followed = await getIsFollowed(username);
      setFollow(followed);
    }
    fetchStatuses();
  }, [username]);
  const handleFollow = async () => {
    try {
      setFollow((followed) => !followed);
      await AddFollow(username);
      queryClient.invalidateQueries("following");
      queryClient.invalidateQueries("followers");
    } catch (error) {
      console.log(error);
    }
  };
  if (currentUserName === username) {
    return <button>update detail</button>;
  }
  return follow ? (
    <button onClick={handleFollow}>Followed</button>
  ) : (
    <button onClick={handleFollow}>Follow</button>
  );
}

export default FollowBtn;
