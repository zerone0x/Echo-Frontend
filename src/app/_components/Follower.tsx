import { getFans } from "../_services/fetchDataAPI";
import UserDetail from "./UserDetail";
import AllUserList from "./AllUserList";

async function Follower({ username }: { username: string }) {
  const followersData = await getFans(username);
  const followersPeople = followersData?.ppl;

  return (
    <>
      <UserDetail username={username} />
      <AllUserList users={followersPeople} />
    </>
  );
}

export default Follower;
