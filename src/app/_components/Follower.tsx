import { useQuery } from "react-query";
import { getFans } from "../_services/fetchDataAPI";
import UserDetail from "./UserDetail";
import AllUserList from "./AllUserList";

function Follower({ username }) {
  const {
    data: followersData,
    error: followersError,
    isLoading: followersLoading,
  } = useQuery(["followers", username], () => getFans(username));

  if (followersLoading) {
    return <Loading />;
  }

  if (followersError) {
    const message = followersError?.message;
    return <div>Error: {message}</div>;
  }
  return (
    <>
      <UserDetail username={username} />
      <AllUserList users={followersData?.ppl} />
    </>
  );
}

export default Follower;
