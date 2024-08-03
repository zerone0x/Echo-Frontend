"use client";
import { AddFollow, getIsFollowed } from "@/app/_services/fetchDataAPI";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useAuth } from "../_utils/getLogin";
import UpdateUserDetail from "./UpdateUserDetail";
import { usePathname } from "next/navigation";

function FollowBtn({ username }: { username: string }) {
  const pathname = usePathname();
  const [follow, setFollow] = useState(false);
  const queryClient = useQueryClient();
  const { currentUserName } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
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

  function handleUpdateDetail() {
    setOpenDialog(true);
  }
  const isCurrentUserAndPathMismatch =
    currentUserName === username && pathname !== `/${username}`;

  if (isCurrentUserAndPathMismatch) {
    return null;
  }
  return currentUserName === username ? (
    <div className="flex justify-end">
      <button className="btn" onClick={handleUpdateDetail}>
        Update Detail
      </button>
      <UpdateUserDetail isOpen={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  ) : (
    <button className="btn" onClick={handleFollow}>
      {follow ? "Unfollow" : "Follow"}
    </button>
  );
}

export default FollowBtn;
