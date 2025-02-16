import BackBtn from "@/app/_components/BackBtn";
import Spinner from "@/app/_components/Spinner";
import UserProfile from "@/app/_components/UserProfile";
import { ParamsProps } from "@/app/_config/type";
import { Suspense } from "react";

export async function generateMetadata({ params }: ParamsProps) {
  return { title: `${params.username}` };
}

function page({ params }: ParamsProps) {
  const username = params.username;

  return (
    <>
      <BackBtn />
      <Suspense fallback={<Spinner />}>
        <UserProfile username={username} />
      </Suspense>
    </>
  );
}

export default page;
