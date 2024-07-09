import UserCard from "./UserCard";

function AllUserList({ users }) {
  return (
    users?.length &&
    users.map((item, index) => <UserCard key={index} user={item} />)
  );
}

export default AllUserList;
