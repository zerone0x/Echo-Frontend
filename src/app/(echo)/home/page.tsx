// "use client";
import EchoItem from "@/app/_components/EchoItem";
import Sidebar from "@/app/_components/Sidebar";
import { GetAllFeeds } from "@/app/_services/fetchDataAPI";
import Link from "next/link";
import { useQuery } from "react-query";
import Loading from "../../loading";
import { Metadata } from "next";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import AllFeedsList from "@/app/_components/AllFeedsList";
import { unstable_noStore as noStore } from "next/cache";
import SignOutButton from "@/app/_components/SignOutButton";

// revalidate to update feeds in time
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  // const {
  //   data: feeds,
  //   error,
  //   isLoading,
  //   isError,
  // } = useQuery(["AllFeeds"], () => GetAllFeeds());

  // if (isLoading) return <Loading />;
  // if (isError) return <div>Error: {error}</div>;

  // it will not cache anything
  // noStore()
  return (
    <div>
      <Link href="/login">Login</Link>
      <Link href="/signup">Register</Link>
      <SignOutButton />
      <Suspense fallback={<Spinner />}>
        <AllFeedsList />
      </Suspense>
    </div>
  );
}
