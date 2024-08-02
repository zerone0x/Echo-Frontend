import FeedList from "@/app/_components/FeedList";
import UserDetail from "@/app/_components/UserDetail";
import UserProfile from "@/app/_components/UserProfile";
import { ParamsProps } from "@/app/_config/type";
import { getFeedByUsername } from "@/app/_services/fetchDataAPI";

export async function generateMetadata({ params }: ParamsProps) {
  return { title: `${params.username}` };
}

function page({ params }: ParamsProps) {
  const username = params.username;

  return <UserProfile username={username} />;
}

export default page;
