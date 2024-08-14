import BackBtn from "@/app/_components/BackBtn";
import Publish from "@/app/_components/Publish";
import Spinner from "@/app/_components/Spinner";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Publish",
};

function page() {
  return (
    <>
      <BackBtn />
      <Suspense fallback={<Spinner />}>
      <Publish />
      </Suspense>
    </>
  );
}

export default page;
