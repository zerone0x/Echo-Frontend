import UserCard from "./UserCard";

function AllUserList({ users }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      {users?.length > 0 &&
        users.map((item, index) => (
          <div className="border-b-2 py-2" key={index}>
            <UserCard user={item} />
          </div>
        ))}
    </div>
  );
}
export default AllUserList;
