import Follower from "@/app/_components/Follower";

function page({ params }) {
  const username = params.username;

  return (
    <>
      <Follower username={username} />
    </>
  );
}

export default page;
