"use client";
import { AddFollow, getIsFollowed } from "@/app/_services/fetchDataAPI";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useAuth } from "../_utils/getLogin";
import UpdateUserDetail from "./UpdateUserDetail";

function FollowBtn({ username }: { username: string }) {
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

  if (currentUserName === username) {
    return (
      <>
        <button className="btn" onClick={handleUpdateDetail}>
          Update Detail
        </button>
        <UpdateUserDetail isOpen={openDialog} setOpenDialog={setOpenDialog} />
      </>
    );
  }
  return follow ? (
    <button className="btn" onClick={handleFollow}>
      Unfollow
    </button>
  ) : (
    <button className="btn" onClick={handleFollow}>
      Follow
    </button>
  );
}

export default FollowBtn;
