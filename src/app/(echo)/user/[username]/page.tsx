import UserProfile from "@/app/_components/UserProfile";
import { ParamsProps } from "@/app/_config/type";

export async function generateMetadata({ params }: ParamsProps) {
  return { title: `${params.username}` };
}

function page({ params }: ParamsProps) {
  const username = params.username;

  return <UserProfile username={username} />;
}

export default page;
