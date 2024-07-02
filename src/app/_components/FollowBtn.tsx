"use server";
import React from "react";
import { AddFollow } from "@/app/_services/fetchDataAPI";

function FollowBtn({ username }) {
  const handleFollow = async () => {
    try {
      await AddFollow(username);
      alert("Followed successfully!");
    } catch (error) {
      console.error("Failed to follow:", error);
      alert("Failed to follow!");
    }
  };

  return <button onClick={handleFollow}>Follow</button>;
}

export default FollowBtn;
