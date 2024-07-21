import AllUserList from "./AllUserList";
import { getFollow } from "../_services/fetchDataAPI";
import UserDetail from "./UserDetail";

async function Followed({ username }: { username: string }) {
  const followingData = await getFollow(username);
  const followingPeople = followingData?.ppl;

  return (
    <>
      <UserDetail username={username} />
      <AllUserList users={followingPeople} />
    </>
  );
}

export default Followed;
