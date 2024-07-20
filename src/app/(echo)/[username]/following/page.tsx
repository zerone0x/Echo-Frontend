import Followed from "@/app/_components/Followed";

function page({ params }) {
  const username = params.username;

  return (
    <>
      <Followed username={username} />
    </>
  );
}

export default page;
