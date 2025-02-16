import { Metadata } from "next";
import AllFeedsList from "@/app/_components/AllFeedsList";
import { unstable_noStore as noStore } from "next/cache";

// revalidate to update feeds in time
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  // it will not cache anything
  // noStore();
  return (
    <div>
      <AllFeedsList />
    </div>
  );
}
