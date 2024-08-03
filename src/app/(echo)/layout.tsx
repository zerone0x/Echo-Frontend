"use client";
import LeftBar from "@/app/_components/LeftBar";
import Sidebar from "@/app/_components/Sidebar";
import ReactQueryProvider from "@/app/_utils/ReactQueryProvider";
import { AuthProvider } from "../_utils/getLogin";
import Header from "../_components/Header";
import { SearchProvider } from "../_utils/SearchContext";
import { PublishProvider } from "../_utils/getPublishType";
import Link from "next/link";
import { FaPen } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EchoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
  // const pathname = usePathname();

  // useEffect(() => {
  //   const token = localStorage.getItem("user");

  //   if (token == null && pathname !== "/") {
  //     router.push("/");
  //   }
  // }, [router]);

  return (
    <ReactQueryProvider>
      <AuthProvider>
        <SearchProvider>
          <PublishProvider>
            <div className="grid h-screen gap-4 bg-[#F3FFF9] sm:gap-6 sm:px-0 md:grid-cols-[0fr_2fr_0.5fr] md:gap-8 md:px-4 lg:grid-cols-[0.7fr_0.7fr_0.7fr] lg:gap-8 lg:px-20">
              <div className="h-full overflow-hidden">
                <LeftBar />
              </div>

              <main className="overflow-scroll border-l-2 border-r-2 lg:min-w-[500px]">
                <Header />
                <div className="min-h-screen">{children}</div>
              </main>

              <div className="h-full overflow-hidden">
                <Sidebar />
              </div>
            </div>
            <Link
              href={`/publish`}
              className="fixed bottom-1/10 right-1/10 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 lg:hidden"
            >
              <FaPen />
            </Link>
          </PublishProvider>
        </SearchProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}
