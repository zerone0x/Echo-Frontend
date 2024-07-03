// "use client";
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
import { headers } from "next/headers";
import Header from "@/app/_components/Header";

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
      <Header title="Echo" />
      <div className="overflow-auto flex-1 mt-16">
        <Suspense fallback={<Spinner />}>
          <AllFeedsList />
        </Suspense>
      </div>
    </div>
  );
}
