"use client";
import { AddFollow } from "@/app/_services/fetchDataAPI";
import { useQueryClient } from "react-query";

function FollowBtn({ username }) {
  const queryClient = useQueryClient();
  const handleFollow = async () => {
    try {
      await AddFollow(username);
      queryClient.invalidateQueries("following");
      queryClient.invalidateQueries("followers");
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleFollow}>Follow</button>;
}

export default FollowBtn;
