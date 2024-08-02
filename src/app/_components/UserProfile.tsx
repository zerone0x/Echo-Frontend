"use client";
import { getFeedByUsername } from "../_services/fetchDataAPI";
import FeedList from "./FeedList";
import UserDetail from "./UserDetail";

async function UserProfile({ username }: { username: string }) {
  const feeds = await getFeedByUsername(username);

  return (
    <div>
      <UserDetail username={username} />
      <FeedList feeds={feeds} />
    </div>
  );
}

export default UserProfile;
